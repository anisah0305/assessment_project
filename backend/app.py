from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL  # Import the MySQL tool

app = Flask(__name__)
CORS(app)

# --- MySQL Configuration ---
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'       # Default XAMPP user
app.config['MYSQL_PASSWORD'] = ''       # Default XAMPP password is empty
app.config['MYSQL_DB'] = 'assessment_db' # This must match the DB you created in phpMyAdmin
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
        assignment_id = data.get('assignment_id', 101) # Default ID if not provided

        # --- DATABASE LOGIC ---
        # 1. Open a connection
        cur = mysql.connection.cursor()
        
        # 2. Prepare the SQL command
        query = "INSERT INTO submissions (student_id, essay_content, assignment_id) VALUES (%s, %s, %s)"
        
        # 3. Execute with data
        cur.execute(query, (student_id, essay_content, assignment_id))
        
        # 4. Save changes to the database
        mysql.connection.commit()
        
        # 5. Close the cursor
        cur.close()

        # Print to terminal for your own confirmation
        print(f"\n✅ Data saved to MySQL for: {student_id}")
        
        return jsonify({
            "status": "success",
            "message": "Assignment received and saved to database!"
        }), 200

    except Exception as e:
        print(f"❌ Database Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)