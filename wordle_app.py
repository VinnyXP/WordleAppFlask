from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/word', methods=['GET'])
def get_word():
    wordlist = ['apple', 'banana', 'cherry', 'orange', 'pear']
    target_word = random.choice(wordlist)
    return jsonify({'word': target_word})

@app.route('/guess', methods=['POST'])
def check_guess():
    guess = request.get_json().get('guess')
    target_word = request.args.get('target_word')
    correct_letters = sum(1 for letter in guess if letter in target_word)
    correct_positions = sum([1 for i in range(len(guess)) if guess[i] == target_word[i]])
    return jsonify({'correct_letters': correct_letters, 'correct_positions': correct_positions})


if __name__ == '__main__':
    app.run(debug=True)

