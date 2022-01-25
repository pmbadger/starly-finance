# Router

### Local Development

The following assumes the use of `node@>=10`.

### Note
File `contracts/interfaces/IStarlyPair.sol` was copied from Core interfaces.

## Install Dependencies

`yarn install`

## Compile Contracts

`yarn compile`

## Deploy contracts

In the file **libraries/StarlyLibrary.sol** on line **25** insert 
**INIT_CODE_HASH**, which is taken from the **Factory** contract.
Then, run command:  

`yarn migrate`
