let whoWon = document.querySelector("#id_win");
let player = document.querySelector("#id_turn");
 
let scoreR = document.querySelector("#id_lbl1");
let scoreG = document.querySelector("#id_lbl2");

let buttonArray = document.querySelectorAll(".btn"); // Get all the buttons

let counter = 0; // Keep track of the number of turns 
let countX = 0 ,countO = 0; // winners score param 
let gameOver = false;
let coArray = []; // Create an array to store the coordinates of the buttons

scoreR.textContent = `${countX} ${'\xa0'.repeat(10)} ${"X"}`; 
scoreG.textContent = `${countX} ${'\xa0'.repeat(10)} ${"O"}`; 
scoreR.style.boxShadow = "0 3px 3px #be1111";

// this will be the functions we use to build the game
function reset() {
    // Reset the game
    for (let i = 0; i < buttonArray.length; i++) {
        buttonArray[i].textContent = "";
    }
    counter = 0; 
    gameOver = false;
    whoWon.textContent = ""; 
    player.textContent = "X התור של";
    scoreR.style.boxShadow ="0 3px 3px #be1111";
    scoreG.style.boxShadow ="0 0 0";
}

function ArrayToMatrix(arr, num) {
    // Convert an array to a matrix for easier mental math
    let matrix = [], i, k;
    // k is the number of columns
    // i is the number of rows

    for (i = 0, k = -1; i < arr.length; i++) { // i is the number of rows and k is the number of columns
        if (i % num == 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(arr[i]);
    }
    return matrix;
}
 
function checkForWin(matrix, symbol) {
    // this function check for all possible wining 
    let rows_c, col_c, diagonal_c, diagonalT_c; // counters 
     
    for (let i = 0; i < matrix.length; i++){
        rows_c = 0, col_c = 0, diagonal_c = 0, diagonalT_c = 0; // set to zero every ittration on i
          
        for(let j = 0; j < matrix[i].length; j++){
           
            if(matrix[i][j].textContent == symbol){
                // check for row
                    rows_c++;
            }

            if(matrix[j][i].textContent == symbol){
                // check colum
                    col_c++;
            }
            if(matrix[j][j].textContent == symbol){
                // check main diagonal 
                diagonal_c++;
            }
            if(matrix[j][matrix.length - j - 1].textContent == symbol){
                diagonalT_c++;
            }            
        }
        if(rows_c == matrix.length || 
            col_c == matrix.length ||
            diagonal_c == matrix.length ||
            diagonalT_c == matrix.length){               
            return true;
        }
    }
    return false;
}

// Game Logic
function scoereCounter(symbol){  //Increase the winner by 1 
    if(symbol == "X"){        
       countX++;
       scoreR.textContent = `${countX} ${'\xa0'.repeat(10)} ${symbol}`  
    }else if(symbol == "O"){               
       countO++;
       scoreG.textContent = `${countO} ${'\xa0'.repeat(10)} ${symbol}`
    } 
} 

buttonArray.forEach((button) => {
    coArray.push(button); // Push the buttons to the array
});
 
let matrix = ArrayToMatrix(coArray, Math.floor(Math.sqrt(coArray.length))); // Convert the array to a matrix
  
for (let i = 0; i < buttonArray.length; i++) { // Loop through the buttons and add an event listener to each one
    
    buttonArray[i].addEventListener("click", 
    function() {         
        let symbol; 
         if(!gameOver){ 
          if(counter % 2 == 0 && buttonArray[i].textContent == "") {                    
            counter++;     
            symbol = 'X';
            player.textContent = "O התור של";
            buttonArray[i].textContent = "X";
            buttonArray[i].style.color = "red"
            scoreG.style.boxShadow = "0 3px 3px #4cce7e "
            scoreR.style.boxShadow  = "0 0 0"                   

          }else if(counter % 2 != 0 && buttonArray[i].textContent == "") {
            counter++;
            symbol = "O";  
            player.textContent = "X התור של";
            buttonArray[i].textContent = "O";
            buttonArray[i].style.color = "green"
            scoreR.style.boxShadow = "0 3px 3px #be1111"
            scoreG.style.boxShadow  = "0 0 0"                     
          }  

          if(checkForWin(matrix, symbol)){            
            scoereCounter(symbol);
            whoWon.style.color = symbol == "X" ? "red" : "green";
            whoWon.textContent =  `!הזוכה ${symbol}`           
            player.textContent = "";
            gameOver = true;                
          }else if(counter == buttonArray.length){  
            whoWon.style.color = "#00e0ff"
            whoWon.textContent = "תיקו"
            player.textContent = "";
            gameOver = true;                
          }        
    } 
});

    buttonArray[i].addEventListener("mouseenter", 
     function() {
         if(buttonArray[i].textContent != ""){ 
           buttonArray[i].style.boxShadow = "inset 0 0 10px red"        
         }
     });

    buttonArray[i].addEventListener("mouseleave", 
     function() {
         if(buttonArray[i].textContent != ""){         
            buttonArray[i].style.boxShadow = "inset 0 0 10px #73dd84" 
         }
     });
}