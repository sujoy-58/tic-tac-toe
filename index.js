document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll(".box");
    const para = document.querySelector("#para");
    const message = document.querySelector(".message");
    const resetBtn = document.querySelector("#resetBtn");
    const congo = document.querySelector("#section");
    let activePlayer = true; // FOR PLAYER X
    
    let winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    const disableBoxes = () => {
        boxes.forEach(box => {
            box.style.pointerEvents = "none";
        });
    };
    
    const enableBoxes = () => {
        boxes.forEach(box => {
            box.style.pointerEvents = "auto";
            box.innerText = "";
        });
    };
    
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (box.innerText === "") {
                if (activePlayer) {
                    box.innerText = "X";
                } else {
                    box.innerText = "O";
                }
                box.style.pointerEvents = "none";
                cheakWinner();
                activePlayer = !activePlayer;
            }
        });
    });
    
    const handleGameResult = (result) => {
        if (result === 'draw') {
            para.innerText = 'OH NOOOOOO! It\'s a Draw!';
        } else {
            para.innerText = `${result} Is The WINNER`;
        }
        message.classList.remove("hide");
    };
    
    const cheakWinner = () => {
        for (let pattern of winningCombinations) {
            const [pos1, pos2, pos3] = pattern.map(index => boxes[index].innerText);
    
            if (pos1 && pos1 === pos2 && pos2 === pos3) {
                disableBoxes();
                handleGameResult(pos1);
                return; // Exit the function, as the game has been won
            }
        }
    
        // Check for a draw
        if ([...boxes].every(box => box.innerText !== '')) {
            handleGameResult('draw');
        }
    };
    resetBtn.addEventListener("click", () => {
        activePlayer = true;
        enableBoxes();
        handleGameResult('');
        message.classList.add("hide");
        para.innerHTML = '';
    
    });
    
});

