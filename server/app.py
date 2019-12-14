#!/usr/bin/env python

import os
from numbers import Number
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from spooky import board_collapse_string

app = Flask(__name__)
CORS(app)


@app.route("/api")
def helloQuantum():
    return "Hello Spooky Quantum Player ;)"

@app.route("/collapse", methods=["POST"])
def collapse():
    req = request.get_json(silent=True)
    print("received: ", req) # debug

    num_super_pos = req["super_positions"]
    if num_super_pos == 0 or not isinstance(num_super_pos, Number):
        return abort(400)
    s = board_collapse_string(num_super_pos)
    return jsonify({"res": s})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
