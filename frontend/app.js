document.addEventListener('DOMContentLoaded', () => {
	const API_URL = 'http://localhost:5000/';
	// Elements
	const btnRock = document.querySelector('button.rock');
	const btnPaper = document.querySelector('button.paper');
	const btnScissors = document.querySelector('button.scissors');
	const resultEl = document.querySelector('.result');
	const questionImg = document.querySelector('.question-mark');

	// Maps
	const nameToLetter = { rock: 'r', paper: 'p', scissors: 's' };
	const letterToName = { r: 'Rock', p: 'Paper', s: 'Scissors' };
	const letterToAsset = { r: 'assets/rock.png', p: 'assets/paper.png', s: 'assets/scissors.png' };

	const buttons = { rock: btnRock, paper: btnPaper, scissors: btnScissors };

	function setBusy(busy) {
		Object.values(buttons).forEach(b => (b.disabled = busy));
		if (busy) {
			resultEl.innerHTML = '<em>Waiting for opponent...</em>';
		}
	}

	function clearSelection() {
		Object.values(buttons).forEach(b => b.classList.remove('selected'));
	}

	function choiceName(letter) {
		return letterToName[letter] || letter;
	}

	async function play(choiceLetter, clickedButton) {
		clearSelection();
		clickedButton.classList.add('selected');
		// show user's chosen image while waiting
		if (letterToAsset[choiceLetter]) questionImg.src = letterToAsset[choiceLetter];

		setBusy(true);
		try {
				const resp = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ choice: choiceLetter }),
			});

			if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
			const data = await resp.json();

			// show computer's choice image
			if (data.comp_choice && letterToAsset[data.comp_choice]) {
				questionImg.src = letterToAsset[data.comp_choice];
			}

			// update result text
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
		} finally {
			setBusy(false);
		}
	}

	// Wire up buttons
	btnRock.addEventListener('click', () => play(nameToLetter.rock, btnRock));
	btnPaper.addEventListener('click', () => play(nameToLetter.paper, btnPaper));
	btnScissors.addEventListener('click', () => play(nameToLetter.scissors, btnScissors));

	// Optional: keyboard shortcuts R/P/S
	document.addEventListener('keydown', (e) => {
		const key = e.key.toLowerCase();
		if (key === 'r') btnRock.click();
		if (key === 'p') btnPaper.click();
		if (key === 's') btnScissors.click();
	});
});
