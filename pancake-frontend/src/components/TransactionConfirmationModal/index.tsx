import React, { useCallback } from 'react'
import styled from 'styled-components'
import {
  Button,
  Text,
  ErrorIcon,
  ArrowUpIcon,
  MetamaskIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
} from 'pancakeswap-uikit'
import { registerToken } from 'utils/wallet'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { ChainId, Currency, Token } from 'pancakeswap-sdk'
import { RowFixed } from '../Layout/Row'
import Column, { ColumnCenter } from '../Layout/Column'
import { getBlockExplorerLink } from '../../utils'

const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(Column)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 24px 0;
`

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <Spinner />
      </ConfirmedIcon>
      <Column style={{ alignItems: 'center' }}>
        <Text fontSize="20px">{t('Waiting For Confirmation')}</Text>
        <Text bold small textAlign="center" pt="16px">
          {pendingText}
        </Text>
        <Text small color="textSubtle" textAlign="center" pt="16px">
          {t('Confirm this transaction in your wallet')}
        </Text>
      </Column>
    </Wrapper>
  )
}

function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
  txSubmittedContentId,
  setSignatureData,
  setTxHash,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
  txSubmittedContentId?: string | undefined
  setSignatureData?: React.Dispatch<React.SetStateAction<any>>
  setTxHash?: React.Dispatch<React.SetStateAction<string>>
}) {
  const { library } = useActiveWeb3React()

  const customOnDismiss = () => {
    onDismiss()
    if (setSignatureData) {
      setSignatureData(null)
    }
    if (setTxHash) {
      setTxHash('')
    }
  }

  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section>
        <Column style={{ alignItems: 'center' }}>
          <ConfirmedIcon>
            <ArrowUpIcon strokeWidth={0.5} width="90px" color="primary" />
          </ConfirmedIcon>

          <Text fontSize="20px">{t('Transaction Submitted')}</Text>
          {chainId && hash && (
            <Link
              id={`explorer-link-${txSubmittedContentId}`}
              external
              small
              href={getBlockExplorerLink(hash, 'transaction', chainId)}
            >
              {t('View on block explorer')}
            </Link>
          )}
          {currencyToAdd && library?.provider?.isMetaMask && (
            <Button
              id={`add-to-metamask-${txSubmittedContentId}`}
              variant="tertiary"
              mt="12px"
              width="fit-content"
              onClick={() => registerToken(token.address, token.symbol, token.decimals)}
            >
              <RowFixed>
                {t('Add %asset% to Metamask', { asset: currencyToAdd.symbol })}
                <MetamaskIcon width="16px" ml="6px" />
              </RowFixed>
            </Button>
          )}
          <Button id={`close-${txSubmittedContentId}`} onClick={customOnDismiss} mt="20px">
            {t('Close')}
          </Button>
        </Column>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Column style={{ alignItems: 'center' }}>
        <ErrorIcon color="failure" width="64px" />
        <Text color="failure" style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </Text>
      </Column>

      <Flex justifyContent="center" pt="24px">
        <Button onClick={onDismiss}>{t('Dismiss')}</Button>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
  txSubmittedContentId?: string | undefined
  setSignatureData?: React.Dispatch<React.SetStateAction<any>>
  setTxHash?: React.Dispatch<React.SetStateAction<string>>
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
  modalCloseId,
  txSubmittedContentId,
  setSignatureData,
  setTxHash,
}) => {
  const { chainId } = useActiveWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Modal
      modalCloseId={modalCloseId}
      title={title}
      headerBackground="gradients.cardHeader"
      onDismiss={handleDismiss}
      maxWidth="700px"
    >
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
          txSubmittedContentId={txSubmittedContentId}
          setSignatureData={setSignatureData}
          setTxHash={setTxHash}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
