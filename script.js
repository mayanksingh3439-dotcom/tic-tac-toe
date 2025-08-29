let boxes = document.querySelectorAll(".box");
let restartButton = document.querySelector("#restart-btn"); 
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");
let turnX = true; //player x turn
const clickAudio = document.getElementById("click-audio")
const WinPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        // console.log("box was clicked");
        clickAudio.currentTime = 0;
        clickAudio.play();
        if(turnX){
            box.innerText="X";
            turnX = false;
        }else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        checkWinnner();
    });
});
const restartAudio = document.getElementById("restart-audio");
const restartGame = () => {
    restartAudio.currentTime = 0;
    restartAudio.play();
    turnX = true ;
    enableBoxes () ;
    msgBox.classList.add("hide");
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true ;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false ;
        box.innerText = "" ;
    }
}
const winAudio = document.getElementById("win-audio");
const showwinner = (winner) => {
    winAudio.currentTime = 0 ;
    winAudio.play();
    msg.innerText = `Congratulation 🎉, Winner is ${winner}`;
    msgBox.classList.remove("hide");
    disableBoxes();
}
const drawAudio = document.getElementById("draw-audio");
const showDraw = () => {
    drawAudio.currentTime = 0 ;
    drawAudio.play();
    msg.innerText = "It's a Draw 🤝";
    msgBox.classList.remove("hide");
    disableBoxes();
}
const checkWinnner = () =>{
    let winnerFound = false;
    for(let pattern of WinPatterns){
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            if(pos1Value == pos2Value && pos2Value == pos3Value){
                // console.log("winner",pos1Value)
                showwinner(pos1Value);
                winnerFound = true;
                break;
            }
        }    
    }
    if (!winnerFound) {
        let filledBoxes = 0;
        for (let box of boxes) {
            if (box.innerText !== "") filledBoxes++;
        }
        if (filledBoxes === boxes.length) {
            showDraw();
        }
    }
}

restartButton.addEventListener("click",restartGame)