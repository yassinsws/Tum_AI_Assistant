import os
import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from login import login
from db import VectorDB
from dotenv import load_dotenv
from message import AssistantMessage, add_response
load_dotenv()
app = Flask(__name__)
cors = CORS(app, resources={r"/send": {"origins": "*"}})
db = VectorDB()


@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    return jsonify(login(username, password))


starting_message = AssistantMessage("Hi! How can I help you today?", "en")


@app.route('/api/send', methods=['POST', 'GET'])
async def chat():
    chat_history = flask.request.json.get('chat_history') or [starting_message]
    chat_input = flask.request.json.get('chat_input')
    user = flask.request.json.get('user') or None
    chat_history = await add_response(chat_history, chat_input, user)
    chat_history_ser = [message.serialize() for message in chat_history]
    import json
    response = json.dumps(chat_history_ser)
    print(response)
    return response


@app.route('/api/form', methods=['POST', 'GET'])
@app.route('/api/form', methods=['POST', 'GET'])
async def api_upload_pdf():
    UPLOAD_FOLDER = 'uploads'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    contact_person = request.form.get('contactPerson')
    source_url = request.form.get('sourceUrl')

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if 'file-upload' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file-upload']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        await db.upload_new_pdf(file_path, filename, contact_person, source_url)  # Assuming this is a synchronous call

    return jsonify(
        {"message": "File uploaded successfully", "contactPerson": contact_person, "sourceUrl": source_url}), 200

