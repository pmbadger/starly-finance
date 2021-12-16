import json
import math
import requests
import time
import datetime
import csv
import os
from os.path import join, dirname
from decimal import Decimal
from web3 import Web3
from operator import itemgetter
from collections import defaultdict
from dotenv import load_dotenv

IS_MAINNET = False

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

ACCOUNT_FOR_COLLECTING_TOKENS = os.environ.get("ACCOUNT")
PRIVATE_KEY = os.environ.get("PRIVATE_KEY")
BSCSCAN_API_KEY = os.environ.get("BSCSCAN_API_KEY")

STLY_USD_PRICE = Decimal('0.075') * 10 ** 18
MIN_USD_PURCHASE_LIMIT = Decimal('100') * 10 ** 18
MAX_USD_PURCHASE_LIMIT = Decimal('3000') * 10 ** 18

if IS_MAINNET:
    BSC_RPC_URL = "https://bsc-dataseed.binance.org/"
    BSCSCAN_API = "https://api.bscscan.com/api"
    STLY_TOKEN_ADDRESS = ...   # Add abi for this address
    USDT_TOKEN_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"
    BUSD_TOKEN_ADDRESS = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    START_TOKEN_SALE_BLOCK = ...
    FINISH_TOKEN_SALE_BLOCK = ...
    AMOUNT_OF_STLY_FOR_AIRDROP = Decimal('1000000') * 10 ** 18
else:
    BSC_RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/"
    BSCSCAN_API = "https://api-testnet.bscscan.com/api"
    STLY_TOKEN_ADDRESS = "0xA969Af3F97642f2Ca0A203FCc15277A6CB563827"
    USDT_TOKEN_ADDRESS = "0x76e99578ff5fb219ff562Eb9B8E376a926818735"
    BUSD_TOKEN_ADDRESS = "0xB5552A702111ac8dF3D8cCAe7B2b9EBF98DA4E7A"
    START_TOKEN_SALE_BLOCK = 14949019
    FINISH_TOKEN_SALE_BLOCK = 14998354
    AMOUNT_OF_STLY_FOR_AIRDROP = Decimal('300000') * 10 ** 18
    TEST_GAS_PRICE = "11"


class BscApiException(Exception):
    def __init__(self, message):
        super().__init__(message)


def get_web3(endpoint):
    return Web3(Web3.HTTPProvider(endpoint))


def get_contract(w3, contract_address):
    with open(f'abi/{contract_address}.json') as f:
        return w3.eth.contract(
            address=contract_address,
            abi=json.load(f)
        )


def convert_stly_to_usd(stly_amount):
    return stly_amount * STLY_USD_PRICE / (10 ** 18)


def convert_usd_to_stly(usd_amount):
    return math.floor(usd_amount / STLY_USD_PRICE * 10 ** 18)


def get_response_data(response, request_description):
    if response.ok:
        result = response.json()
        if (
                result['status'] == '1'
                or result['status'] == '0'
                and result["result"] == []
                and result["message"] == "No records found"
        ):
            return result['result']
        else:
            raise BscApiException(f'Message: {result["message"]}. Result: {result["result"]}')
    else:
        raise BscApiException(
            f"Request: {request_description}. Status code: {response.status_code}. Text: {response.text}")


def get_token_account_balance_of_collector(token_address):
    return get_response_data(
        requests.get(
            BSCSCAN_API,
            params={
                'module': 'account',
                'action': 'tokenbalance',
                'contractaddress': token_address,
                'address': ACCOUNT_FOR_COLLECTING_TOKENS,
                'tag': 'latest',
                'apikey': BSCSCAN_API_KEY
            }, headers={"User-Agent": "Mozilla/5.0"}),
        request_description=f"Get {token_address} balance of collector"
    )


def get_erc20_transfer_events(from_block, to_block, token_address):
    return get_response_data(
        requests.get(
            BSCSCAN_API,
            params={
                'module': 'logs',
                'action': 'getLogs',
                'fromBlock': from_block,
                'toBlock': to_block,
                'address': token_address,
                'topic0': "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                'topic0_2_opr': 'and',
                'topic2': "0x000000000000000000000000" + ACCOUNT_FOR_COLLECTING_TOKENS[2:],
                'apiKey': BSCSCAN_API_KEY
            },
            headers={"User-Agent": "Mozilla/5.0"}
        ), request_description=f'Get {token_address} transfer events'
    )


def get_bnb_balance(address):
    return get_response_data(
        requests.get(
            BSCSCAN_API,
            params={
                'module': 'account',
                'action': 'balance',
                'address': address,
                'apikey': BSCSCAN_API_KEY
            },
            headers={"User-Agent": "Mozilla/5.0"}),
        request_description=f'Get BNB balance of {address}'
    )


def get_gas_price():
    return get_response_data(
        requests.get(
            BSCSCAN_API,
            params={
                'module': 'gastracker',
                'action': 'gasoracle',
                'apikey': 'YourApiKeyToken'
            },
            headers={"User-Agent": "Mozilla/5.0"}),
        request_description='Get gas price'
    )


def get_all_events_by_token_address(token_address, from_block, to_block):
    list_of_events = []
    events = get_erc20_transfer_events(from_block, to_block, token_address)
    list_of_events.extend(events)
    max_events_to_get = 1000
    if len(events) == max_events_to_get:
        while True:
            last_event_block = int(events[-1]['blockNumber'], 16)
            time.sleep(5)
            # It needs to query from the same block where it finished,
            # because if there are 100 transactions in a block and only 50 are read, the remaining transactions are lost
            events = get_erc20_transfer_events(last_event_block, to_block, token_address)
            list_of_events.extend(events)
            if len(events) < max_events_to_get:
                break

    # If there are repeating events, delete them
    simplified_list_of_events = [{
        'block_number': int(event['blockNumber'], 16),
        'recipient': Web3.toChecksumAddress('0x' + event['topics'][1][26:]),
        'amount': Decimal(str(int(event['data'], 16))),
        'token': Web3.toChecksumAddress(event['address']),
        'tx_index': int(event['transactionIndex'], 16) if event['transactionIndex'] != "0x" else 0,
        'tx_hash': event['transactionHash']
    } for event in list_of_events]

    filtered_events = [
        dict(event_tuple) for event_tuple in set([tuple(event.items()) for event in simplified_list_of_events])
    ]
    # This sorting to save to file, because set will shuffle everything
    sorted_events = sorted(filtered_events, key=itemgetter('block_number', 'tx_index'))

    timestamp = str(int(datetime.datetime.now().replace(microsecond=0).timestamp()))
    if not os.path.isdir('logs'):
        os.mkdir('logs')
    with open(f'logs/{timestamp}_{token_address}.csv', 'w') as f:
        writer = csv.writer(f)
        writer.writerow(["Number", "Block Number", "From", "Token", "Amount", "Tx Hash", 'Tx index'])
        for index, event in enumerate(sorted_events):
            writer.writerow([
                index + 1,
                event['block_number'],
                event['recipient'],
                event['token'],
                str(event['amount']),
                event['tx_hash'],
                event['tx_index']
            ])
    return sorted_events


def concatenate_events(usd_addresses, from_block, to_block):
    all_events = []
    for address in usd_addresses:
        events = get_all_events_by_token_address(address, from_block, to_block)
        all_events.extend(events)
        time.sleep(5)
    return sorted(all_events, key=itemgetter('block_number', 'tx_index'))


def save_recipients_data_to_file(recipients):
    timestamp = str(int(datetime.datetime.now().replace(microsecond=0).timestamp()))
    serializable_recipients = defaultdict(lambda: {
        'usdt_to_return': '',
        'busd_to_return': '',
        'stly_in_usd_for_payout': '',
        'stly_to_return': ''
    })
    for recipient in recipients:
        serializable_recipients[recipient]['usdt_to_return'] = str(recipients[recipient]['usdt_to_return'])
        serializable_recipients[recipient]['busd_to_return'] = str(recipients[recipient]['busd_to_return'])
        serializable_recipients[recipient]['stly_in_usd_for_payout'] = str(recipients[recipient]['stly_in_usd_for_payout'])
        serializable_recipients[recipient]['stly_to_return'] = str(recipients[recipient]['stly_to_return'])
    if not os.path.isdir('logs'):
        os.mkdir('logs')
    with open(f'logs/{timestamp}_recipients.json', 'w') as f:
        json.dump(serializable_recipients, f)


def get_airdrop_recipients(transfer_events, total_stly_in_usd):
    recipients = defaultdict(lambda: {
        'usdt_to_return': Decimal('0'),
        'busd_to_return': Decimal('0'),
        'stly_in_usd_for_payout': Decimal('0')
    })
    for transfer in transfer_events:
        total_stly_in_usd_for_payout = sum([i['stly_in_usd_for_payout'] for i in recipients.values()])
        recipient_address = transfer['recipient']
        transfer_amount = transfer['amount']
        transfer_token = transfer['token']
        last_usdt_to_return = recipients[recipient_address]['usdt_to_return']
        last_busd_to_return = recipients[recipient_address]['busd_to_return']
        last_stly_in_usd_for_payout = recipients[recipient_address]['stly_in_usd_for_payout']

        amount_to_check_purchase_limit = transfer_amount + last_stly_in_usd_for_payout
        available_stly_in_usd_to_purchase = total_stly_in_usd - total_stly_in_usd_for_payout

        if (
                transfer_amount < MIN_USD_PURCHASE_LIMIT
                or transfer_amount > MAX_USD_PURCHASE_LIMIT
                or available_stly_in_usd_to_purchase < MIN_USD_PURCHASE_LIMIT
                # This line is for those who dropped tokens after the end of the sale but before the airdrop
                or transfer['block_number'] > FINISH_TOKEN_SALE_BLOCK
        ):
            usdt_to_return = transfer_amount + last_usdt_to_return if transfer_token == USDT_TOKEN_ADDRESS else last_usdt_to_return
            busd_to_return = transfer_amount + last_busd_to_return if transfer_token == BUSD_TOKEN_ADDRESS else last_busd_to_return
            stly_in_usd_for_payout = last_stly_in_usd_for_payout

        elif amount_to_check_purchase_limit > MAX_USD_PURCHASE_LIMIT:
            extra_tokens = amount_to_check_purchase_limit - MAX_USD_PURCHASE_LIMIT
            stly_in_usd_allowed_to_purchase = transfer_amount - extra_tokens

            if available_stly_in_usd_to_purchase >= stly_in_usd_allowed_to_purchase:
                usdt_to_return = extra_tokens + last_usdt_to_return if transfer_token == USDT_TOKEN_ADDRESS else last_usdt_to_return
                busd_to_return = extra_tokens + last_busd_to_return if transfer_token == BUSD_TOKEN_ADDRESS else last_busd_to_return
                # stly_in_usd_for_payout should always be 3,000
                stly_in_usd_for_payout = last_stly_in_usd_for_payout + stly_in_usd_allowed_to_purchase
            else:
                usd_to_return = transfer_amount - available_stly_in_usd_to_purchase
                usdt_to_return = usd_to_return + last_usdt_to_return if transfer_token == USDT_TOKEN_ADDRESS else last_usdt_to_return
                busd_to_return = usd_to_return + last_busd_to_return if transfer_token == BUSD_TOKEN_ADDRESS else last_busd_to_return
                stly_in_usd_for_payout = last_stly_in_usd_for_payout + available_stly_in_usd_to_purchase

        else:
            if available_stly_in_usd_to_purchase >= transfer_amount:
                usdt_to_return = last_usdt_to_return
                busd_to_return = last_busd_to_return
                stly_in_usd_for_payout = last_stly_in_usd_for_payout + transfer_amount
            else:
                extra_tokens = transfer_amount - available_stly_in_usd_to_purchase
                usdt_to_return = extra_tokens + last_usdt_to_return if transfer_token == USDT_TOKEN_ADDRESS else last_usdt_to_return
                busd_to_return = extra_tokens + last_busd_to_return if transfer_token == BUSD_TOKEN_ADDRESS else last_busd_to_return
                stly_in_usd_for_payout = last_stly_in_usd_for_payout + available_stly_in_usd_to_purchase

        recipients[recipient_address] = {
            "usdt_to_return": usdt_to_return,
            "busd_to_return": busd_to_return,
            "stly_in_usd_for_payout": stly_in_usd_for_payout
        }

    for recipient in recipients:
        recipients[recipient]['stly_to_return'] = convert_usd_to_stly(recipients[recipient]['stly_in_usd_for_payout'])

    save_recipients_data_to_file(recipients)

    return recipients


def is_calculations_correct(recipients_data):
    total_stly_to_return = sum([i['stly_to_return'] for i in recipients_data.values()])
    return total_stly_to_return <= AMOUNT_OF_STLY_FOR_AIRDROP


def is_collector_balance_sufficient(recipients_data):
    usdt_collector_balance = int(get_token_account_balance_of_collector(USDT_TOKEN_ADDRESS))
    time.sleep(5)
    busd_collector_balance = int(get_token_account_balance_of_collector(BUSD_TOKEN_ADDRESS))
    time.sleep(5)
    stly_collector_balance = int(get_token_account_balance_of_collector(STLY_TOKEN_ADDRESS))
    time.sleep(5)
    bnb_collector_balance = int(get_bnb_balance(ACCOUNT_FOR_COLLECTING_TOKENS))

    total_usdt_to_return = sum([i['usdt_to_return'] for i in recipients_data.values()])
    total_busd_to_return = sum([i['busd_to_return'] for i in recipients_data.values()])

    return (
            usdt_collector_balance >= total_usdt_to_return
            and busd_collector_balance >= total_busd_to_return
            and stly_collector_balance >= AMOUNT_OF_STLY_FOR_AIRDROP
            and bnb_collector_balance > 0
    )


def send_stly_tokens(recipients):
    w3 = get_web3(BSC_RPC_URL)
    tokens_to_return = {
        'usdt_to_return': {
            'contract': get_contract(w3, USDT_TOKEN_ADDRESS),
        },
        'busd_to_return': {
            'contract': get_contract(w3, BUSD_TOKEN_ADDRESS),
        },
        'stly_to_return': {
            'contract': get_contract(w3, STLY_TOKEN_ADDRESS),
        }
    }

    if is_calculations_correct(recipients) and is_collector_balance_sufficient(recipients):
        timestamp = str(int(datetime.datetime.now().replace(microsecond=0).timestamp()))
        if not os.path.isdir('logs'):
            os.mkdir('logs')
        with open(f'logs/{timestamp}_airdrop_data.csv', 'w') as f:
            writer = csv.writer(f)
            writer.writerow(["Number", "Time tx send", "To", "Token", "Amount", "Gas", "Gas Price", "Tx Hash"])

            for index, recipient in enumerate(recipients):
                for token_to_return in ['usdt_to_return', 'busd_to_return', 'stly_to_return']:
                    token_amount_to_return = int(recipients[recipient][token_to_return])
                    if token_amount_to_return > Decimal('0'):
                        contract = tokens_to_return[token_to_return]['contract']

                        estimated_gas = contract \
                            .functions \
                            .transfer(recipient, token_amount_to_return) \
                            .estimateGas({'from': ACCOUNT_FOR_COLLECTING_TOKENS})

                        gas_price = get_gas_price()['ProposeGasPrice'] if IS_MAINNET else TEST_GAS_PRICE

                        tx = contract.functions.transfer(recipient, token_amount_to_return).buildTransaction({
                            'from': ACCOUNT_FOR_COLLECTING_TOKENS,
                            'nonce': w3.eth.getTransactionCount(ACCOUNT_FOR_COLLECTING_TOKENS),
                            'value': 0,
                            'gas': estimated_gas,
                            'gasPrice': w3.toWei(gas_price, 'gwei')
                        })

                        account = w3.eth.account.privateKeyToAccount(PRIVATE_KEY)
                        signed = account.signTransaction(tx)
                        tx_hash = w3.eth.sendRawTransaction(signed.rawTransaction)
                        w3.eth.waitForTransactionReceipt(tx_hash)

                        writer.writerow([
                            index + 1,
                            datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S"),
                            recipient,
                            contract.address,
                            token_amount_to_return,
                            estimated_gas,
                            w3.toWei(gas_price, 'gwei'),
                            Web3.toHex(tx_hash)
                        ])
                        time.sleep(10)

    else:
        raise Exception('Cannot send tokens.')


def main():
    total_stly_in_usd = convert_stly_to_usd(AMOUNT_OF_STLY_FOR_AIRDROP)
    transfer_events = concatenate_events(
        [BUSD_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS],
        from_block=START_TOKEN_SALE_BLOCK,
        to_block=FINISH_TOKEN_SALE_BLOCK
    )
    recipients = get_airdrop_recipients(transfer_events, total_stly_in_usd)
    send_stly_tokens(recipients)


main()
