from flask import Flask, request, jsonify
from flask_cors import CORS  # 1. Added CORS import

app = Flask(__name__)
CORS(app)  # 2. Enable CORS for all routes

users = [
    {"email":"student@umk.edu.my","password":"1234","role":"Student"},
    {"email":"lecturer@umk.edu.my","password":"1234","role":"Lecturer"}
]

@app.route('/login', methods=['POST'])
def login():

    data = request.json
    email = data['email']
    password = data['password']

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({
                "status":"success",
                "role":user["role"]
            })

    return jsonify({"status":"fail"})


@app.route('/sso-login', methods=['POST'])
def sso_login():

    email = request.json['email']

    if email.endswith("@umk.edu.my"):

        return jsonify({
            "status":"success",
            "message":"Logged in using UMK SSO"
        })

    return jsonify({
        "status":"fail",
        "message":"Invalid UMK email"
    })

@app.route('/submit', methods=['POST'])
def submit_assignment():
    try:
        data = request.json
        student_id = data.get('student_id')
        essay_content = data.get('essay_content')

        # This prints to your VS Code terminal so you can see it working!
        print(f"\n--- New Submission Received ---")
        print(f"Student ID: {student_id}")
        print(f"Essay Preview: {essay_content[:100]}...") 
        print(f"-------------------------------\n")

        # Later, we will add MySQL code here to save the data
        return jsonify({
            "status": "success",
            "message": "Assignment received by the server!"
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500    


if __name__ == "__main__":
    app.run(debug=True)