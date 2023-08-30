 /*----- constants -----*/
 const addHidden = (x) => {
    x.classList.add('hidden');
}
 const removeHidden = (x) => {
    x.classList.remove('hidden');
}

const enableInputs = () => {
    document.getElementById('name').removeAttribute('disabled');
    document.getElementById('balance').removeAttribute('disabled');
};

const disableInputs = () => {
    document.getElementById('name').setAttribute('disabled', 'true');
    document.getElementById('balance').setAttribute('disabled', 'true');
};

const disableHitandStand = () => {
    document.getElementById("hit").setAttribute('disabled', 'true');
    document.getElementById("stand").setAttribute('disabled', 'true');
}

const dealCardToDealer = () => {
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerPoint += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById('dealerCards').append(cardImg);
}

const dealCardToPlayer = () => { // deal card to player
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerPoint += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById('playerCards').append(cardImg);
}

const dealCardToDealerHidden = () => {  // deal card to dealer
    hidden = deck.pop();
    dealerPoint += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    const hiddenElement = document.getElementById('hidden');
    hiddenElement.src = "./cards/BACK.png";
}

const revealHiddenCard = () => { // reveal hidden card when there's Blackjack
    document.getElementById('hidden').src = "./cards/" + hidden + ".png";
}


// Trying modal (for About Game)
//Grabbing Elements
const $openBtn = document.querySelector('#openModal');
const $modal = document.querySelector('#modal');
const $closeBtn = document.querySelector('#close');

//Event Handlers
const openModal = () => {
  $modal.showModal()
}

//Event Listeners
$openBtn.addEventListener('click', openModal);

// Modal for restarting game with countdown
const showModal2 = (message) => {
    const modal = document.getElementById('modal2');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

const closeModal2 = () => {
    const modal = document.getElementById('modal2');
    modal.style.display = 'none';
}

 /*----- state variables -----*/
 let dealerPoint = 0;
 let playerPoint = 0;
 let dealerAceCount = 0; // to keep track of number of Ace's to determine whether it should be 1 or 11 points.
 let playerAceCount = 0;
 let canHit = true; // allows the player to draw card if the point is less than 21.
 let canStand = true;
 let deck = [];
 let hidden = [];
 let restartCounter = 5;

 /*----- cached elements  -----*/
 const dealerAndplayer = document.getElementById("dealerAndplayer"); // hide the dealer and player elements before the start of the game
 addHidden(dealerAndplayer);
 const restartButton = document.getElementById("restart");
 const continueButton = document.getElementById("continue");
 const balanceInput = document.getElementById('balance');
 const wagerInput = document.getElementById('wager');
 const startButton = document.getElementById('start');
 const inputField = document.getElementById('input-field');

 /*----- event listeners -----*/
 startButton.addEventListener('click', () => {
    // Hide inputField, show dealer and player elements, restart and continiue buttons when game start
    addHidden(inputField);
    removeHidden(dealerAndplayer);
    removeHidden(restartButton);
    removeHidden(continueButton);
    disableInputs();

    //Disable inputs for balance, 
 
    balance = parseInt(balanceInput.value);
    if(isNaN(balance) || balance <=0) {
        alert("please enter valid starting balance.");
        return;
    }

    wager = parseInt(wagerInput.value);
    if (isNaN(wager) || wager <= 0 || wager > balance) {
        alert("Please enter a valid wager with your available balance!");
        removeHidden("#input-Field");
        disableHitandStand();
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
    // console.log(deck);
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
        disableHitandStand();
        removeHidden(inputField);
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

    // Deal 2 cards to dealer and player each
    dealCardToDealerHidden(); // Deal the first card of the dealer as hidden
    dealCardToPlayer();
    dealCardToDealer();
    dealCardToPlayer();

    // Check for blackjack for dealer and player
    if (playerPoint === 21) {
        if (dealerPoint === 21) {
            // Both dealer and player have blackjack, it's a draw
            balanceInput.value = balance;
            document.getElementById('dealerPoint').innerText = dealerPoint;
            document.getElementById('playerPoint').innerText = playerPoint;
            document.getElementById('result').innerText = "It's a draw (both have Blackjack)!";
            removeHidden(inputField);
            revealHiddenCard();
            disableHitandStand();
            return;
        } else {
            // Player has blackjack, player wins
            balance += wager ; 
            balanceInput.value = balance;
            document.getElementById('dealerPoint').innerText = dealerPoint;
            document.getElementById('playerPoint').innerText = playerPoint;
            document.getElementById('result').innerText = "Player wins with Blackjack!";
            removeHidden(inputField)
            revealHiddenCard();
            disableHitandStand();
            return;
        }
    } else if (dealerPoint === 21) {
        // Dealer has blackjack, dealer wins
        balance -= wager; // Player loses the wager
        balanceInput.value = balance;
        document.getElementById('dealerPoint').innerText = dealerPoint;
        document.getElementById('playerPoint').innerText = playerPoint;
        document.getElementById('result').innerText = "Dealer wins with Blackjack!";
        removeHidden(inputField)
        revealHiddenCard();
        disableHitandStand();
        return;
    }

    // Enable hit and stand buttons
    document.getElementById("hit").removeAttribute('disabled');
    document.getElementById("stand").removeAttribute('disabled');

    // check for player and dealer blackjack before starting the game.

    const hitButton = document.getElementById("hit");
    hitButton.addEventListener("click", hit);

    const standButton = document.getElementById("stand");
    standButton.addEventListener("click", stand);

    // Reset other elements
    document.getElementById('dealerPoint').innerText = "";
    document.getElementById('playerPoint').innerText = "";
    document.getElementById('result').innerText = "";

    // // Show the balance input for wager adjustment
    // balanceInput.classList.remove('hidden');

    // // Show the wager input after a round
    // wagerInput.classList.remove('hidden');

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

    if (playerPointAceCount(playerPoint, playerAceCount) > 21) { // to check for player point and ace count before allowing player to continue to draw count
        canHit = false; // not working yet******
    }
}

const stand = () => {  // stand condition ends the game
    dealerPoint = dealerPointAceCount(dealerPoint, dealerAceCount);
    playerPoint = playerPointAceCount(playerPoint, playerAceCount);
    canHit = false;
    document.getElementById('hidden').src = "./cards/" + hidden + ".png";
    
    // Player has chosen to stand, handle dealer's draw logic
    while (dealerPoint < 16 && deck.length > 0) {
        dealCardToDealer();
    }

    let displayMessage = "";  // display message for outcome of different scenarios
    if (playerPoint > 21){    // blackjack favours the dealer, player will lose even if dealer bust.
        displayMessage = "Dealer wins";
        balance -= wager;
    } else if (playerPoint > dealerPoint){
        displayMessage = "Player wins";
        balance += wager;
    } else if (playerPoint === dealerPoint){
        displayMessage = "It's a draw.";
    } else if (playerPoint <= 21 && dealerPoint > 21){
        displayMessage = "Player wins.";
        balance += wager;
    } else { 
        displayMessage = "Dealer wins";
        balance -= wager;
}
    balanceInput.value = balance;
    document.getElementById('dealerPoint').innerText = dealerPoint;
    document.getElementById('playerPoint').innerText = playerPoint;
    document.getElementById('result').innerText = displayMessage;

    console.log(balance);

    removeHidden(inputField);
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
    // enableInputs(); 
    location.reload(); // refresh the page
}

restartButton.addEventListener("click", restartGame);

//continue game function
const continueGame = () => {
    addHidden(inputField);

    if (balance <= 0) {
        const countdownMessage = "Your balance is empty. Game will be restarted in 5 seconds";
        showModal2(countdownMessage);
        setTimeout(() => {
            closeModal2();
            restartWithCountdown();
        }, 1000); // 5000 milliseconds = 5 seconds
        return;
    }
    startGame();
    balanceInput.innerText = `Balance: $${balance}`;
};

continueButton.addEventListener("click", continueGame);

//restart game function with 5s countdown
const restartWithCountdown = () => {
    if (restartCounter > 0) {
        const countdownMessage = `Restarting game in ${restartCounter} seconds`;
        showModal2(countdownMessage);

        setTimeout(() => {
            closeModal2();
            restartCounter--;
            restartWithCountdown();
        }, 1000); // call the function again after 1s
    } else {
        showModal2("Restarting game now...");
        setTimeout(() => {
            closeModal2();
            restartCounter = 5;
            restartGame(); // Reload the page to restart the game
        }, 1000); // delay before reloading the page
    }
}

// window.onload = () => {
    balanceInput.innerText = `Balance: $${balance}`;
    startingDeck();
    startGame();
// }