# theBlackjackGame
A simple Blackjack game. ## English version 

![image](https://github.com/JsExplorer/theBlackjackGame/assets/93700857/f3697fbd-076e-45b5-b37d-78fb270dd20b)


Planning the layout of the Blackjack game.
- the starting page will attempt to use form for the input name and amount.
- the game play wil display the (entered) starting balance and query user how much does he/she would like to bet in this game. Hit the start button and start playing.
- once the game is completed. Based on win/lose, the player's reamining balance will be added/deducted based on his wedger.

![image](https://github.com/JsExplorer/theBlackjackGame/assets/93700857/9420153a-2248-4672-896a-3c350768dd26)


Study the rules of Blackjack. credit : https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/b/Blackjack.htm#:~:text=Rules,king)%20are%20also%20worth%2010.
- the hands with the highest point value (not exceeding 21), will win the round.
- total value > 21 === bust
- <<to explore implementing minimum point value 12>>
Card value worth
- card 2 to card 10 are worth their face value, i.e. 2 = 2, 3 = 3, etc.
- face cards (Jack, Queen and King) are worth 10.
- ace card default value is 11 unless this woudl cause the player to bust, then it will be deemed as value '1'.
- two-card hand of 21 (an ace + ten-value card) is called "Blackjack" or a "natural", and is an automatic winner.
- no minimum point value unlike chinese "ban-luck".

Scenario
- (BUST) If player busts, he/she loses, even if dealer also busts -> Blackjack favours the dealer.
- (PUSH) If both player and dealer have the same point value, neither wins the round.
- (WIN/LOSE) Player/Dealer with higher point value wins, and the opposite side loses.


(Javascript)

Frame 1
Starting Page
1. Request the player's name and starting balance.
(Create a form to ask for player's name and starting balance.)

Frame 2
General gameplay
1. Player enters the wedger for the current round. Take note: player cannot enter wedger more than the remaining balance. If not, system will reject and auto prompt for another input.
(Create a input for wedger.)
(Create a "Play" button to start the game.)

3. Cards are dealt randomly.
(Create a function to deal the cards randomly. 1st card (shown) and 2nd card (hidden).)

4. If the dealer has blackjack and the player doesn't, the player automatically loses.
- (Create the condition to check for this)
4. If the player has blackjack and the dealer doesn't, the player automatically wins.
- (Create the condition to check for this)
5. If both the player and dealer have blackjack then it's a push. -> round ends, go to next round.
- (Create the condition to check for this)
6. If neither side has blackjack, then player will given options to play out his/her hand. (Create the condition to check for this)
Options as follow:
- Hit (take another card) // create a function to allow players to take a card (hit) or hold position (Stand).
- Stand (take no more card)
7. Based on the value point, evaluate player or dealer wins the game.
(Create a function to evaluate the value point between player and dealer, then determine the winner)

Frame 3
Outcome
- If player wins, "remaining balance" + wedger.
- If player loses, "remaining balance" - wedger.
- If player do not have any remaining balance, exit the game. Else, prompt the player to continue playing or exit the game.
(Renders the "WIN" or "LOSE" message and the remaining balance. Create two buttons to allow player to continue player or exit the game). 


