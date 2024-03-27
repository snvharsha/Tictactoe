// accessing HTML elements

let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#reset-btn");
let playerIp1 = document.querySelector("#firstplayer");
let playerIp2 = document.querySelector("#secondplayer");
let newgamebtn = document.querySelector("#newgamebtn");
let msgContainer = document.querySelector(".winner"); // winner div
let msg = document.querySelector("#winningMsg"); // winner msg span
let turnO = true; // turns

//winner set
const winnerSet=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];

// alerting the player to input their names to start the game
document.querySelector(".game").addEventListener("click",()=>{
        if(playerIp1.value === "" || playerIp2.value === ""){
        alert("Please enter your names to start");
        }
    });

// Displaying "START" in #player1 Div

let alertMsg = document.createElement("h1");
const displayStart = ()=>{
    if(playerIp1.value !== "" && playerIp2.value !== ""){
    alertMsg.innerText ="Start ";
    document.querySelector("#player1").appendChild(alertMsg);
    for(let btn of btns)
    {
        btn.disabled = false;
    }
    }
    else{
        for(let btn of btns)
        {
            btn.disabled = true;
        }
    }
    };

playerIp2.addEventListener("change",displayStart) ;
playerIp1.addEventListener("change",displayStart) ;

// button traversal to find the winnig pattern after each turn and displaying respective turns
let chance = true;
btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(playerIp1.value !== "" && playerIp2.value !== ""){
           
            for(let btn of btns)
            {
                 btn.disabled = false;
            };
       if(turnO)
       {
             //player -O first player
        btn.innerText ="O";
        if (chance) {
            document.querySelector("#player2").appendChild(alertMsg);
            document.querySelector("#player1").lastElementChild === alertMsg?document.querySelector("#player1").removeChild(alertMsg):null;
            
        } else {
            document.querySelector("#player1").appendChild(alertMsg);
            document.querySelector("#player2").lastELementChild === alertMsg?document.querySelector("#player2").removeChild(alertMsg):null;
            
        }
        chance = !chance;
       }
       else{
             //player-X second player
        btn.innerText="X";
        if (chance) {
            document.querySelector("#player2").appendChild(alertMsg);
            document.querySelector("#player1").lastElementChild === alertMsg?document.querySelector("#player1").removeChild(alertMsg):null;
            
        } else {
            document.querySelector("#player1").appendChild(alertMsg);
            document.querySelector("#player2").lastELementChild === alertMsg?document.querySelector("#player2").removeChild(alertMsg):null;
            
        }
        chance = !chance;
      
    } turnO =! turnO;
    
}
else{
    
    disableBtns;
}  
btn.disabled=true;
checkWinner(); 
    });

});
// cheking winner
const checkWinner=()=>{
    for(let pattern of winnerSet){
        let posVal1 = btns[pattern[0]].innerText;
        let posVal2 = btns[pattern[1]].innerText;
        let posVal3 = btns[pattern[2]].innerText;
        if(posVal1 !== "" && posVal2 !== "" && posVal3 !== ""){
            if(posVal1 === posVal2 && posVal2 ===  posVal3 ){
    
                showWinner(posVal1,turnO);
            }
        }
        
    }
}

// restart function 
const restart = ()=>{
    turnO=true;
    chance=true;
    playerIp1.value = "";
    playerIp2.value = "";
    enableBtns();
    msgContainer.classList.add("hide");
    alertMsg.innerText="";
    disableBtns();
    playerIp2.addEventListener("change",()=>{
        if(playerIp1.value !== "" && playerIp2.value !== ""){
        alertMsg.innerText ="Start ";
        document.querySelector("#player1").appendChild(alertMsg);
        enableBtns();
        }
        })

};

//buttons disabling
const disableBtns =()=>{
    for(let btn of btns)
     {
         btn.disabled = true;

     }
};

//buttons enabling
const enableBtns =()=>{
    for(let btn of btns)
   {  
    btn.disabled = false;
     btn.innerText="";
   }
};

// displaying winner on top 
const showWinner =(pasVal1)=>{
    alertMsg.style.display = "hide";
    if(pasVal1 === "O"){    
    msg.innerText = `Congratualtions,Winner is ${playerIp1.value}`;
    msgContainer.classList.remove("hide");
    disableBtns();
    }
    else{
    disableBtns();
    msg.innerText = `Congratualtions,Winner is ${playerIp2.value}`;  msgContainer.classList.remove("hide");
    }
}
resetBtn.addEventListener("click",restart);
newgamebtn.addEventListener("click",restart);
