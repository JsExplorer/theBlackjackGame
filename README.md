# The Blackjack Game

## Overview
- Introduction
- Rules & How to Play
- Favourite JS functions
- Challenges
- Possible future developments
- Credits


## Introduction

Welcome to the Blackjack Game! This is a simple browser-based card game that allows you to experience the excitement of playing Blackjack against the dealer. Test your luck and strategic skills in this classic casino game.

The game is coded using (1) HTML, (2) CSS, (3) Javascript, (4) GitHub. Deployment: Github.

## Rules & How to Play

1. Blackjack, also known as 21, is a popular casino game where players aim to beat the dealer by having a hand value closest to 21 without exceeding it. Here's how the game works:

2. You start with a balance and place a wager. Values have to be positive and wager must be less than input balance.

![image](https://github.com/JsExplorer/theBlackjackGame/assets/93700857/eb8dbb5f-f5ab-4494-8a83-14cda802b3b7)

3.You and the dealer are dealt two cards each.

4. Cards 2 to 10 are worth their face value. Face cards (J, Q, K) are worth 10, and Aces can be worth 1 or 11, whichever is better for your hand.
  
5. Your goal is to have a hand value closer to 21 than the dealer without going over.
   
6.You can choose to "hit" to draw another card or "stand" to keep your current hand.

7.If your hand value exceeds 21, you bust and lose the wager.

8.If your hand value is 21 or less and higher than the dealer's, you win the wager.

9.If the dealer's hand value exceeds 21 or is lower than yours, you win the wager.

Game link : https://jsexplorer.github.io/theBlackjackGame/

## Favourite JS functions

1. Modal function
The game features a modal that provides information about the game. By clicking the "About Game" button, you can access this modal to learn more about the game's rules and how to play. 

2. Reset Counter (My Favorite JS Function)
One of the standout features of this game is the "Restart Game" functionality with a countdown. If your balance reaches zero, the game will automatically restart after a 5-second countdown. This engaging function ensures that you can quickly get back into the action without interruption.

![image](https://github.com/JsExplorer/theBlackjackGame/assets/93700857/919a48cf-56da-4e23-93c8-a6198a3947a0)


## Challenges

While developing this Blackjack game, one of the challenges I encountered was properly implementing the logic to control player actions such as hitting and standing, as well as ensuring that the game state is accurately reflected in the UI. The handling of the game's various states, including player turns, card values, and win/lose conditions, required careful consideration and thorough testing to ensure a smooth and enjoyable user experience.

## Possible future developments

1. Introduce splitting hands function.
2. Introduce additional player.
3. Leaderboard to track highest winrate.
4. Improving the CSS styling.

## Credits
1. Majority of the rules were adapted from this link : https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/b/Blackjack.htm#:~:text=Rules,king)%20are%20also%20worth%2010
2. Cards image were downloaded from Github: https://github.com/ImKennyYip/black-jack/tree/master/cards. <<credits>>
