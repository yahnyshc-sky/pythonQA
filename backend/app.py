from flask import Flask, request, jsonify
from flask_cors import CORS
import random
app = Flask(__name__)

CORS(app)

def choose_winner(user_choice: str) -> dict:
    choices = ["r", "p", "s"]

    comp_choice = random.choice(choices)
    result = "tie"
    win_map = {"r": "s", "p": "r", "s": "p"}

    if comp_choice != user_choice:
        if win_map[comp_choice] == user_choice:
            result = "comp"
        else:
            result = "user"

    return {
        'comp_choice': comp_choice,
        'user_choice': user_choice,
        'result': result
    }

@app.route('/', methods=['POST'])
def index():
    user_choice = request.json.get('choice').lower()
    return jsonify(choose_winner(user_choice)), 200


if __name__ == '__main__':
    app.run(debug=True)



