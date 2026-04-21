from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# --- MySQL Configuration ---
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'assessment_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Mock user database for login
users = [
    {"email": "student@umk.edu.my", "password": "1234", "role": "Student"},
    {"email": "lecturer@umk.edu.my", "password": "1234", "role": "Lecturer"}
]

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({
                "status": "success",
                "role": user["role"]
            })
    return jsonify({"status": "fail"}), 401

@app.route('/sso-login', methods=['POST'])
def sso_login():
    email = request.json.get('email', '')
    if email.endswith("@umk.edu.my"):
        return jsonify({
            "status": "success",
            "message": "Logged in using UMK SSO"
        })
    return jsonify({
        "status": "fail",
        "message": "Invalid UMK email"
    })

@app.route('/submit', methods=['POST'])
def submit_assignment():
    try:
        data = request.json
        student_id = data.get('student_id')
        essay_content = data.get('essay_content')
        assignment_id = data.get('assignment_id', 101)

        if not student_id or not essay_content or len(essay_content.strip()) < 10:
            print(f"⚠️ Blocked invalid submission attempt from Student ID: {student_id}")
            return jsonify({
                "status": "error",
                "message": "Validation Failed: Essay is too short or Student ID is missing!"
            }), 400

        # --- DATABASE LOGIC ---
        cur = mysql.connection.cursor()
        query = "INSERT INTO submissions (student_id, essay_content, assignment_id) VALUES (%s, %s, %s)"
        cur.execute(query, (student_id, essay_content, assignment_id))
        mysql.connection.commit()
        cur.close()

        print(f"\n✅ Data successfully saved to MySQL for: {student_id}")
        
        return jsonify({
            "status": "success",
            "message": "Assignment received and saved to database!"
        }), 200

    except Exception as e:
        print(f"❌ Database Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)