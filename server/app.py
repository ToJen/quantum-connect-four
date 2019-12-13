#!/usr/bin/env python

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from spooky import board_collapse_string

app = Flask(__name__)
CORS(app)


@app.route("/api")
def helloQuantum():
    return "hello Quantum"

@app.route("/collapse", methods=["POST"])
def collapse():
    req = request.get_json(silent=True)
    print(req) # debug

    s = board_collapse_string(req["super_positions"])
    return jsonify({"res": s})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
