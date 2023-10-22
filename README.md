
# Dual Dialogue -- Hearing voices from both sides

## Overview 
In this increasingly divided world, I am hoping to build a platform to encourage dialogue between two sides in potentially controversial topics. 

Many platform nowadays only recommend content similar to user’s point of view , but web3 is an open space and I hope to build something that encourage clash in opinion discussion in opinions with monetary incentive to ensure quality of opinion.

## Description 

In this prototype user can create questions with two options with a bounty, deadline, and a small minimum entry stake. The minimum entry stake is meant to incentives good quality answers, which will be returned unless their answer as been marked as spam/AI-content/hate speech.

Questions will be displayed on front page and user will be able to submit their vote with a rationale (minimum 30 character).

## Work Flow
1.  User create debate topic with a bounty + deadline 
2.  Other users place a stake and share their opinion for both side, which side they pick will not affect their outcome
3. Admin screen for spam/AI generated content, those authors will lose their stake
4. After deadline, User can claim the bounty (split evenly) and get their stake back

### Note on incentive

- Every person who share their opinion will get a share of bounty unless their answer has been marked by admin as spam or hate speech, regardless of whether they voted for the majority or not.

- Every person who submit an answer must submit a small stake(defined by question creator) alongside of the question, stake will be returned as well unless the answer got marked to reduce spam.

## Running Code

1.Enter frontend folder
`cd frontend`

2.Install dependencies
`npm install`

3. Get it running
`npm run dev`

## Smart Contract

The project is deployed on the following chains, with contracts listed below.

- [Scroll Sepolia](https://sepolia-blockscout.scroll.io/address/0xA982878Cce7F79cb8b75C26c049dCdEf32F0112c#code)



 - [Mantle Testnet](https://explorer.testnet.mantle.xyz/address/0x256D6A9dc4e82f5d817c2395DF2Be6EE04daB5Fb#code)
	 - Link to the tweet: https://twitter.com/0xfrypan/status/1715760764886171676


- [Goerli](https://goerli.etherscan.io/address/0x6a2b832c75e327Fcf6a6321DBeB5002603bcDB1B#code)