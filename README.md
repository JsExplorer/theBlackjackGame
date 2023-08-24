# theBlackjackGame
A simple Blackjack game. ## English version 

![image](https://github.com/JsExplorer/theBlackjackGame/assets/93700857/f3697fbd-076e-45b5-b37d-78fb270dd20b)


1. Planning the layout of the Blackjack game.
- the starting page will attempt to use form for the input name and amount.
- the game play wil display the (entered) starting balance and query user how much does he/she would like to bet in this game. Hit the start button and start playing.
- once the game is completed. Based on win/lose, the player's reamining balance will be added/deducted based on his wedger.

![image](https://github.com/JsExplorer/theBlackjackGame/assets/93700857/9420153a-2248-4672-896a-3c350768dd26)


2. Study the rules of Blackjack. credit : https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/b/Blackjack.htm#:~:text=Rules,king)%20are%20also%20worth%2010.
- the hands with the highest point value (not exceeding 21), will win the round.
- total value > 21 === bust

Card value worth
- card 2 to card 10 are worth their face value, i.e. 2 = 2, 3 = 3, etc.
- face cards (Jack, Queen and King) are worth 10.
- ace card default value is 11 unless this woudl cause the player to bust, then it will be deemed as value '1'.

Scenario
- (BUST) If player busts, he/she loses, even if dealer also busts -> Blackjack favours the dealer.
- (PUSH) If both player and dealer have the same point value, neither wins the round.
- (WIN/LOSE) Player/Dealer with higher point value wins, and the opposite side loses.

3. Gameplay
