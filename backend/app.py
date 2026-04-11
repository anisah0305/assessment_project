from flask import Flask, request, jsonify

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run(debug=True)