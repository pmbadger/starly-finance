# Router

### Local Development

The following assumes the use of `node@>=10`.

### Note
File `contracts/interfaces/IBiswapPair.sol` was copied from Core interfaces.

## Install Dependencies

`yarn install`

## Compile Contracts

`yarn compile`

## Deploy contracts

In the file **libraries/BiswapLibrary.sol** on line **25** insert 
**INIT_CODE_HASH**, which is taken from the **Factory** contract.
Then, run command:  

`yarn migrate`
