from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status')
def status():
    return jsonify({"status": "online", "message": "Personal website is running perfectly!"})

if __name__ == '__main__':
    # Binding to 0.0.0.0 to ensure accessibility across different host aliases
    app.run(host='0.0.0.0', port=5004, debug=True)