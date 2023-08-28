 /*----- constants -----*/
let dealerPoint = 0;
let playerPoint = 0;
let dealerAceCount = 0; // to keep track of number of Ace's to determine whether it should be 1 or 11 points.
let playerAceCount = 0;
let canHit = true; // allows the player to draw card if the point is less than 21.
let canStand = true;
let deck = [];
let hidden = [];
// let balance = 0; // Initialize balance
// let wager = 0; // Initialize balance

 /*----- state variables -----*/


 /*----- cached elements  -----*/
 const restartButton = document.getElementById("restart");
 const continueButton = document.getElementById("continue");
 const balanceInput = document.getElementById('balance');
 const wagerInput = document.getElementById('wager');
 const startButton = document.getElementById('start');

 /*----- event listeners -----*/
 startButton.addEventListener('click', () => {
    balance = parseInt(balanceInput.value);
    if(isNaN(balance) || balance <=0) {
        alert("please enter valid starting balance.");
        return;
    }

    wager = parseInt(wagerInput.value);
    if (isNaN(wager) || wager <= 0 || wager > balance) {
        alert("Please enter a valid wager with your available balance!");
        return;
    }

    startGame();
 });

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
    wager = parseInt(wagerInput.value);
    if (wager <=0 || wager > balance){
        alert("Please enter a valid wager with your available balance!")
        return;
    }

    balanceInput.innerText = `Balance: $${balance}`;

    dealerPoint = 0;
    playerPoint = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    canHit = true;
    canStand = true;
    deck = [];
    hidden = '';

    startingDeck(); // Initialize the deck

    // Reset dealer cards
    const dealerCardsElement = document.getElementById('dealerCards');
    const dealerCardImages = dealerCardsElement.getElementsByTagName('img');
    for (let i = dealerCardImages.length - 1; i > 0; i--) {
        dealerCardImages[i].remove();
    }

    // Reset player cards
    const playerCardsElement = document.getElementById('playerCards');
    playerCardsElement.innerHTML = '';

    // Reset hidden card to back image
    const hiddenElement = document.getElementById('hidden');
    if (hiddenElement) {
        hiddenElement.src = "./cards/BACK.png";
    }

    // Deal dealer's hidden card
    hidden = deck.pop(); 
    dealerPoint += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // Deal card to dealer (enure above 16 pts) and deal card to player
    while (dealerPoint < 16 && deck.length > 0) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerPoint += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealerCards').append(cardImg);
    }

    for (let i = 0; i < 2 && deck.length > 0; i++) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerPoint += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById('playerCards').append(cardImg);
    }

    const hitButton = document.getElementById("hit");
    hitButton.addEventListener("click", hit);

    const standButton = document.getElementById("stand");
    standButton.addEventListener("click", stand);

    // Reset other elements
    document.getElementById('dealerPoint').innerText = "";
    document.getElementById('playerPoint').innerText = "";
    document.getElementById('result').innerText = "";
}

const hit = () => {     // Logic for drawing a card
    if(!canHit){
        return;
    }         
    let cardImg = document.createElement('img'); // create and append the card image element into the dealer hand, sourced the image from the ./card folder
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

    // console.log(dealerPoint);
    // console.log(playerPoint);

    let displayMessage = "";  // display message for outcome of different scenarios
    if (playerPoint > 21){    // blackjack favours the dealer, player will lose even if dealer bust.
        displayMessage = "Dealer wins";
        balance -= wager;
        balanceInput.innerText = `Balance: $${balance}`;
    } else if (playerPoint > dealerPoint){
        displayMessage = "Player wins";
        balance += wager;
        balanceInput.innerText = `Balance: $${balance}`;
    } else if (playerPoint === dealerPoint){
        displayMessage = "It's a draw.";
        balanceInput.innerText = `Balance: $${balance}`;
    } else if (playerPoint < 21 && dealerPoint > 21){
        displayMessage = "Player wins.";
        balance += wager;
        balanceInput.innerText = `Balance: $${balance}`;
    } else { 
        displayMessage = "Dealer wins";
        balance -= wager;
        balanceInput.innerText = `Balance: $${balance}`;
};

    document.getElementById('dealerPoint').innerText = dealerPoint;
    document.getElementById('playerPoint').innerText = playerPoint;
    document.getElementById('result').innerText = displayMessage;

    console.log(balance);
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

const restartGame = () => {
    console.log("restart button clicked");
    startGame();
}

restartButton.addEventListener("click", restartGame);


const continueGame = () => {
    if (balance <= 0) {
        alert("Your balance is empty. Please restart the game.");
        return;
    }
    startGame();
    balanceInput.innerText = `Balance: $${balance}`;
};

continueButton.addEventListener("click", continueGame);

window.onload = () => {
    balanceInput.innerText = `Balance: $${balance}`;
    startingDeck();
    startGame();
}