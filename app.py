from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/screen/<int:screen_number>')
def screen(screen_number):
    return render_template(f'screen{screen_number}.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
