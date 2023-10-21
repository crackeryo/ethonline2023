
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

# Smart Contract

The project is deployed on the following chains, with contracts listed below.

- [Scroll Sepolia](https://sepolia-blockscout.scroll.io/address/0xf77A71Ade24100fee83c899821ccBDdc549618e0#code)



 - [Mantle Testnet](https://explorer.testnet.mantle.xyz/address/0x265863884dE65c2902025AdeB327Be0e18898e29#code)
	 - Link to the tweet: https://twitter.com/0xfrypan/status/1715760764886171676


- [Goerli](https://goerli.etherscan.io/address/0x03Bfe63C1742F653418cd49754dBd9239bDb8cAF#code)