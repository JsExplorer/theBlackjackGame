 /*----- constants -----*/
let dealerPoint = 0;
let playerPoint = 0;
let dealerAceCount = 0; // to keep track of number of Ace's to determine whether it should be 1 or 11 points.
let playerAceCount = 0;
let canHit = true; // allows the player to draw card if the point is less than 21.
let canStand = true;

 /*----- state variables -----*/
let deck = [];
let hidden = [];

 /*----- cached elements  -----*/



 /*----- event listeners -----*/


 /*----- functions -----*/
const startingDeck = () => {
    let suit = ['D', 'C', 'H', 'S'];
    let faceValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (let x = 0; x < suit.length; x++){
        for (let y = 0; y < faceValue.length; y++){
            deck.push(faceValue[y] + "-" + suit[x]);   
        }
    }
    shuffleDeck(); // shuffle the deck at the start of the game
    console.log(deck);
} 

const shuffleDeck = () => {
    for (let i=0; i < deck.length; i++){  // shuffle for 100times
        let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i]; // create a temporarydeck to hold deck[i]
    deck[i] = deck[j]; // take deck[j] into deck[i]
    deck[j] = temp; // take deck[i] into deck[j]
    };
}

const startGame = () => {
    hidden = deck.pop(); // dealer's hidden card
    dealerPoint += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerPoint);

    while (dealerPoint < 16){ // Set a minimum point for the dealer to draw card
        let cardImg = document.createElement('Img'); // create and append the card image element into the dealer hand, sourced the image from the ./card folder
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerPoint += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealerCards').append(cardImg);
    }
    // console.log(dealerPoint);

    // start of the game, player should get 2 cards
    for (i=0; i < 2; i++) {
        let cardImg = document.createElement('Img'); // create and append the card image element into the dealer hand, sourced the image from the ./card folder
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerPoint += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById('playerCards').append(cardImg);
    }
    // console.log(playerPoint);

    const hitButton = document.getElementById("Hit");
    hitButton.addEventListener("click", hit);

    const standButton = document.getElementById("Stand");
    standButton.addEventListener("click", stand);
}

const hit = () => {     // Logic for drawing a card
    if(!canHit){
        return;
    }         
    let cardImg = document.createElement('Img'); // create and append the card image element into the dealer hand, sourced the image from the ./card folder
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerPoint += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById('playerCards').append(cardImg);
    // console.log(playerPoint);

    if (playerPointAceCount(playerPoint, playerAceCount) > 21) { // to check for player point and ace count before allowing player to continue to draw count
        canHit = false; // not working yet******
    }
}

const stand = () => {  // stand condition ends the game
    dealerPoint = dealerPointAceCount(dealerPoint, dealerAceCount);
    playerPoint = playerPointAceCount(playerPoint, playerAceCount);
    canHit = false;
    document.getElementById('hidden').src = "./cards/" + hidden + ".png";

    let displayMessage = "";  // display message for outcome of different scenarios
    if (playerPoint > 21){    // blackjack favours the dealer, player will lose even if dealer bust.
        displayMessage = "Dealer wins";
    } else if (playerPoint > dealerPoint){
        displayMessage = "Player wins";
    } else if (playerPoint === dealerPoint){
        displayMessage = "It's a draw."
    } displayMessage = "Dealer wins"

    document.getElementById('dealerPoint').innerText = dealerPoint;
    document.getElementById('playerPoint').innerText = playerPoint;
    document.getElementById('result').innerText = displayMessage;

}





const getValue = (card) => {
    let data = card.split("-"); // for e.g. "7-D" -> ["7", "D"]
    let value = data[0];

    if (isNaN(value)){ // face cards (A, J, Q , K)
        if (value === 'A') {
            return 11;
        }
        return 10;
    }   return parseInt(value);
}

const checkAce = (card) => {
    if (card[0] === ('A')){
        return 1;
    } return 0;
}

const playerPointAceCount = (playerPoint, playerAceCount) => {
    while (playerPoint > 21 && playerAceCount > 0){ // to reduce Ace point from 11 to 1 if total value would bust 21.
        playerPoint -= 10;
        playerAceCount -= 1;
    }
    return playerPoint;
}

const dealerPointAceCount = (dealerPoint, dealerAceCount) => {
    while (dealerPoint > 21 && dealerAceCount > 0){ // to reduce Ace point from 11 to 1 if total value would bust 21.
        dealerPoint -= 10;
        dealerAceCount -= 1;
    }
    return dealerPoint;
}



window.onload = () => {
    startingDeck();
    startGame();
}