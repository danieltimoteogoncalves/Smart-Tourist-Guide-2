from flask import Flask
from flask_cors import CORS
from controllers.api_controller import api_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
app.register_blueprint(api_bp)

if __name__ == "__main__":
    app.run(debug=True)
