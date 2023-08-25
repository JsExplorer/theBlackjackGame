 /*----- constants -----*/
const dealerPoint = 0;
const playerPoint = 0;
const aceCount = 0; // to keep track of number of Ace's to determine whether it should be 1 or 11 points.

const hidden = 0;
const canHit = true; // allows the player to draw card if the point is less than 21.

 /*----- state variables -----*/
 window.onload = () => {
    startingDeck();
}

 /*----- cached elements  -----*/


 /*----- event listeners -----*/
function hitButtonclick() {
}

 /*----- functions -----*/
const startingDeck = () => {
    const deck = [];
    let suit = ['D', 'C', 'H', 'S'];
    let faceValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (let x = 0; x < suit.length; x++){
        for (let y = 0; y < faceValue.length; y++){
            deck.push(faceValue[y] + "-" + suit[x]);   
        }
    }
    console.log(deck);
} 


