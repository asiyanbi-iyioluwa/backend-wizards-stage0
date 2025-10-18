from flask import Flask, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

@app.route("/me", methods=["GET"])
def get_profile():
    try:
        response = requests.get("https://catfact.ninja/fact", timeout=5)
        response.raise_for_status()
        cat_fact = response.json().get("fact", "Cats are mysterious creatures.")
    except Exception:
        cat_fact = "Unable to fetch a cat fact at the moment."

    data = {
        "status": "success",
        "user": {
            "email": "your_email@example.com",
            "name": "Your Full Name",
            "stack": "Python/Flask"
        },
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "fact": cat_fact
    }
    return jsonify(data), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
