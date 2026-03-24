from flask import Flask, render_template, request, redirect, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__)

# =========================
# إنشاء قاعدة البيانات (بشكل آمن)
# =========================
def init_db():
    if not os.path.exists('users.db'):
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute('''
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT
            )
        ''')
        conn.commit()
        conn.close()

# 👇 ننفذها أول طلب فقط
@app.before_request
def before_request():
    init_db()

# =========================
# الصفحة الرئيسية
# =========================
@app.route('/')
def index():
    return render_template('index.html')

# =========================
# تسجيل
# =========================
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            conn = sqlite3.connect('users.db')
            c = conn.cursor()
            c.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
            conn.commit()
            conn.close()
            return redirect('/')
        except:
            return "الإيميل مستخدم"

    return render_template('register.html')

# =========================
# تسجيل دخول
# =========================
@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')

# =========================
# API
# =========================
@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    message = data.get('message')
    return jsonify({"response": f"🤖: {message}"})

# =========================
# ✅ تشغيل manifest.json
# =========================
@app.route('/manifest.json')
def manifest():
    return send_from_directory('.', 'manifest.json')

# =========================
# ✅ تشغيل Service Worker من static
# =========================
@app.route('/static/sw.js')
def service_worker():
    return send_from_directory('static', 'sw.js')
