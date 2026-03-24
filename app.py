from flask import Flask, render_template, request, redirect, jsonify
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

# 👇 ننفذها أول طلب فقط (مو عند تشغيل السيرفر)
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
# ✅ هذا هو التعديل الوحيد المهم
# =========================
@app.route('/sw.js')
def service_worker():
    return app.send_static_file('sw.js')
