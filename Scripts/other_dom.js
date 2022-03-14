let lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let attackPanel = document.getElementById("attack-panel");
let attackPanelText;
let attackPanelCharacter;

const changeLetter = (letter) =>{
    attackPanelText = attackPanel.innerHTML;
    attackPanelCharacter = attackPanelText.charAt(1);
    attackPanel.innerHTML = letter + attackPanelCharacter;
}

const changeNumber = (number) =>{
    attackPanelText = attackPanel.innerHTML;
    attackPanelCharacter = attackPanelText.charAt(0);
    attackPanel.innerHTML = attackPanelCharacter + number;
}

const createButtons = () =>{
    for(let i = 0; i < lettersArray.length; i++){
        document.getElementById("letter-buttons").innerHTML += `
        <button class = "letter-buttons-style" onclick = "changeLetter('${lettersArray[i]}')">${lettersArray[i]}</button>
        `;

        document.getElementById("number-buttons").innerHTML += `
        <button class = "letter-buttons-style" onclick = "changeNumber('${i +1}')">${i + 1}</button>
        `;
    }
}

createButtons();