document.addEventListener('DOMContentLoaded', async () => {
  // Get elements from the DOM
  const guessInput = document.querySelector('.guess-input');
  const guessButton = document.querySelector('.guess-button');
  const resultMessage = document.querySelector('.result-message');

  // Get a random word to guess from the server
  const response = await fetch('http://127.0.0.1:5000/word');
  const data = await response.json();
  const wordToGuess = data.word;
  console.log(`Word to guess: ${wordToGuess}`);

  // Set up event listener for guess button click
  guessButton.addEventListener('click', async () => {
    const guess = guessInput.value.toLowerCase();
    console.log(`User guessed: ${guess}`);

    // Validate guess
    if (!/^[a-z]{5}$/.test(guess)) {
      resultMessage.textContent = 'Please enter a valid 5-letter word.';
      resultMessage.classList.remove('correct');
      resultMessage.classList.add('incorrect');
      return;
    }

    // Send guess to server
    const response = await fetch('http://127.0.0.1:5000/guess?target_word=' + wordToGuess, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess: guess })
    });
    const data = await response.json();

    // Display result message
    if (data.correctPositions === 5) {
      resultMessage.textContent = 'Congratulations, you guessed the word!';
      resultMessage.classList.remove('incorrect');
      resultMessage.classList.add('correct');
    } else {
      let message = '';
      if (data.correctPositions > 0) {
        message += `${data.correctPositions} letter(s) in the correct position\n`;
      }
      if (data.correctLetters > data.correctPositions) {
        message += `${data.correctLetters - data.correctPositions} additional letter(s) are correct but in the wrong position\n`;
      }
      if (data.correctPositions === 0 && data.correctLetters === 0) {
        message += 'No letters are correct';
      }
      resultMessage.textContent = message.trim();
      resultMessage.classList.remove('correct');
      resultMessage.classList.add('incorrect');
    }
  });
});


/*document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const guessInput = document.querySelector('.guess-input');
    const guessButton = document.querySelector('.guess-button');
    const resultMessage = document.querySelector('.result-message');
  
    // Generate a random word to guess
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordToGuess = words[randomIndex];
    console.log(`Word to guess: ${wordToGuess}`);
  
    // Set up event listener for guess button click
    guessButton.addEventListener('click', async () => {
      const guess = guessInput.value.toLowerCase();
      console.log(`User guessed: ${guess}`);
  
      // Validate guess
      if (!/^[a-z]{5}$/.test(guess)) {
        resultMessage.textContent = 'Please enter a valid 5-letter word.';
        resultMessage.classList.remove('correct');
        resultMessage.classList.add('incorrect');
        return;
      }
  
      // Send guess to server
      const response = await fetch('http://127.0.0.1:5000/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: guess })
      });
      const data = await response.json();
  
      // Display result message
      if (data.correct) {
        resultMessage.textContent = 'Congratulations, you guessed the word!';
        resultMessage.classList.remove('incorrect');
        resultMessage.classList.add('correct');
      } else {
        let message = '';
        if (data.correctPositions > 0) {
          message += `${data.correctPositions} letter(s) in the correct position\n`;
        }
        if (data.correctLetters > data.correctPositions) {
          message += `${data.correctLetters - data.correctPositions} additional letter(s) are correct but in the wrong position\n`;
        }
        if (data.correctPositions === 0 && data.correctLetters === 0) {
          message += 'No letters are correct';
        }
        resultMessage.textContent = message.trim();
        resultMessage.classList.remove('correct');
        resultMessage.classList.add('incorrect');
      }
    });
  }); */
  