#!/usr/bin/env python

import os
from numbers import Number
from flask import Flask, request, jsonify, abort, send_file
from flask_cors import CORS
from spooky import board_collapse_string

app = Flask(__name__, static_folder=os.environ.get('STATIC', "static"))
CORS(app)
@app.route('/')
def route_root():
    index_path = os.path.join(app.static_folder, 'index.html')
    return send_file(index_path)


@app.route('/<path:path>')
def route_frontend(path):
    # ...could be a static file needed by the front end that
    # doesn't use the `static` path (like in `<script src="bundle.js">`)
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_file(file_path)
    # ...or should be handled by the SPA's "router" in front end
    else:
        index_path = os.path.join(app.static_folder, 'index.html')
        return send_file(index_path)


@app.route("/api")
def helloQuantum():
    return "Hello Spooky Quantum Player ;)"


@app.route("/api/collapse", methods=["POST"])
def collapse():
    req = request.get_json(silent=True)
    print("received: ", req)  # debug

    num_super_pos = req["super_positions"]
    if num_super_pos == 0 or not isinstance(num_super_pos, Number):
        return abort(400)
    s = board_collapse_string(num_super_pos)
    return jsonify({"res": s})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
