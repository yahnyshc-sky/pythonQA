const API_URL = 'http://localhost:5000/';

const btnRock = document.querySelector('button.rock');
const btnPaper = document.querySelector('button.paper');
const btnScissors = document.querySelector('button.scissors');
const resultEl = document.querySelector('.result');
const questionImg = document.querySelector('.question-mark');

const nameToLetter = { rock: 'r', paper: 'p', scissors: 's' };
const letterToAsset = { r: 'assets/rock.png', p: 'assets/paper.png', s: 'assets/scissors.png' };

const buttons = { rock: btnRock, paper: btnPaper, scissors: btnScissors };

function clearSelection() {
	Object.values(buttons).forEach(b => b.classList.remove('selected'));
}

async function play(choiceLetter, clickedButton) {
	clearSelection();
	clickedButton.classList.add('selected');
	
	if (letterToAsset[choiceLetter]) questionImg.src = letterToAsset[choiceLetter];

	try {
			const resp = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ choice: choiceLetter }),
		});

		if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
		const data = await resp.json();

		if (data.comp_choice && letterToAsset[data.comp_choice]) {
			questionImg.src = letterToAsset[data.comp_choice];
		}

		if (data.result === 'tie') {
			resultEl.innerHTML = `<strong>It's a tie!</strong>`;
		} else if (data.result === 'user') {
			resultEl.innerHTML = `<strong>You win!</strong>`;
		} else if (data.result === 'comp') {
			resultEl.innerHTML = `<strong>You lost!</strong>`;
		} else {
			resultEl.innerHTML = `<strong>Unknown result</strong>`;
		}

	} catch (err) {
		resultEl.innerHTML = `<strong>Error:</strong> ${err.message}`;
	} 
}

btnRock.addEventListener('click', () => play(nameToLetter.rock, btnRock));
btnPaper.addEventListener('click', () => play(nameToLetter.paper, btnPaper));
btnScissors.addEventListener('click', () => play(nameToLetter.scissors, btnScissors));
