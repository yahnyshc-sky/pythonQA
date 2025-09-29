from flask import Flask, request, jsonify
from flask_cors import CORS
import random
app = Flask(__name__)

CORS(app)
choices = [
    "r",
    "p",
    "s",
]

def choose_winner(user_choice):
    comp_choice = random.choice(choices)
    if comp_choice == user_choice:
        return {'comp_choice': comp_choice, 'user_choice':user_choice, 'result': "tie"}
    elif comp_choice == "r" and user_choice == "s" or \
    comp_choice == "p" and user_choice == "r" or \
    comp_choice == "s" and user_choice == "p":
        return {'comp_choice': comp_choice, 'user_choice': user_choice, 'result': "comp"}
    else:
        return {'comp_choice': comp_choice, 'user_choice': user_choice, 'result': "user"}

@app.route('/', methods=['POST'])
def index():
    user_choice = request.json.get('choice').lower()
    return jsonify(choose_winner(user_choice))


if __name__ == '__main__':
    app.run(debug=True)