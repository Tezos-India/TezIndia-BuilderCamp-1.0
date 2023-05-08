# Pokemon NFT Marketplace

This is a sample NFT marketplace contract for trading Pokemon NFTs.

## Contract Overview

The contract is composed of two smart contracts:
- `Pokemon`: an FA2-compatible smart contract that implements the minting and transfer of Pokemon NFTs.
- `PokemonMarketplace`: a marketplace smart contract that allows users to buy and sell Pokemon NFTs.

<<<<<<< HEAD
Go to folder Week 2
Go to foler Pod 1
Create folder Simarpreet Singha
upload my assignment files as Smartpy_project 
=======
The `PokemonMarketplace` contract relies on the `Pokemon` contract to handle the minting and transfer of NFTs.

## Contract Usage

### Minting NFTs

To mint a new Pokemon NFT, call the `mint` entry point on the `PokemonMarketplace` contract with the following parameters:
- `metadata`: a string containing the URL of the metadata for the NFT.
- `price`: the price of the NFT in tez.

### Buying NFTs

To buy a Pokemon NFT, call the `buy` entry point on the `PokemonMarketplace` contract with the following parameters:
- `token_id`: the ID of the NFT to buy.

### Updating Admin

To update the admin of the `PokemonMarketplace` contract, call the `update_admin` entry point with the new admin address.

### Withdrawing Funds

To withdraw funds from the contract, call the `withdraw` entry point with the following parameters:
- `amount`: the amount of tez to withdraw.
- `address`: the address to send the funds to.
>>>>>>> 07a6c5308b516e5f9f0addc7dda623e2d54c2920

