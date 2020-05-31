
# Facial Recognition based eVoting DAPP
A decentralized application, or Dapp, on the Ethereum Network with facial recognition support

Follow the steps below to download, install, and run this project.

## Dependencies
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/
- Kairos: Create a kairos account and get app_id and api_key https://developer.kairos.com/admin


## Step 1. Clone the project
`git clone https://github.com/arjun344/FaceVote`

## Step 2. Install dependencies
```
$ cd election
$ npm install -g truffle
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.

## Step 4. Compile & Deploy Election Smart Contract
`$ truffle migrate --reset`
You must migrate the election smart contract each time your restart ganache.

## Step 5. Configure Metamask
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 6. Run the Front End Application
`$ npm run dev`
Visit this URL in your browser: http://localhost:3000

***Meta-mask sometime does not loads properly for that just go to Metamask-->Settings-->Connections-->connect to localhost and refresh the page***

