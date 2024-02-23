const fs = require('fs');
const path = require('path');
const allWordArray = require('./wordArray.js');

function scoreWords(targetWord, pattern, wordsList) {
  // Initialize an object to hold the scored words
  let scoredWords = {};

  wordsList.forEach(word => {
    let score = 0;

    // Track letters found in the correct and incorrect positions
    const correctPositions = new Set();
    const incorrectPositions = new Set();

    // First, handle correct positions and incorrect letters
    for (let i = 0; i < pattern.length; i++) {
      if (targetWord[i] === word[i]) {
        if (pattern[i] === '2') {
          score += 2; // Correct position
          correctPositions.add(i);
        }
        // No action needed for '0' here since correct position overrides it
      } else if (!targetWord.includes(word[i])) {
        score -= 4; // Incorrect letter anywhere in the word
      } else {
        incorrectPositions.add(i);
      }
    }

    // Then, handle correct letters in wrong positions
    incorrectPositions.forEach(i => {
      if (pattern[i] === '1' && targetWord.includes(word[i])) {
        // Ensure we don't reward letters already rewarded for being in the correct position
        if (!correctPositions.has(i)) {
          score += 1;
        }
      }
    });

    // Only add words with a positive score
    if (score > 0) {
      scoredWords[word] = score;
    }
  });

  return scoredWords;
}

// Example usage, assuming wordsArray is your array of 12,000 words
const scoredWords = scoreWords('salet', '02000', allWordArray); // Your 12,000 words array

// Convert the object to an array of [word, score] pairs
const scoredWordsArray = Object.entries(scoredWords);

// Sort the array based on scores
scoredWordsArray.sort((a, b) => a[1] - b[1]);

// Optionally, convert it back to an object, now sorted
const sortedScoredWords = {};
scoredWordsArray.forEach(([word, score]) => {
  sortedScoredWords[word] = score;
});

// If you prefer to work with the array directly, you can skip the re-conversion
console.log(scoredWordsArray); // This will log the sorted array

// If you converted it back into an object
console.log(sortedScoredWords); 