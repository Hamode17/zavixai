// =======================
// عناصر
// =======================
const plusBtn = document.getElementById("plusBtn");
const plusMenu = document.getElementById("plusMenu");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat-box");

// =======================
// زر +
// =======================
plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    plusMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (!plusBtn.contains(e.target) && !plusMenu.contains(e.target)) {
        plusMenu.classList.remove("show");
    }
});

// =======================
// زر الإرسال يتفعل
// =======================
input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        sendBtn.classList.add("active");
    } else {
        sendBtn.classList.remove("active");
    }
});

// =======================
// إرسال رسالة
// =======================
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    // رد مؤقت
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "🤖 جاري التفكير...";
    chatBox.appendChild(botMsg);

    // تمرير للأسفل
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";
    sendBtn.classList.remove("active");
});

// =======================
// 🔥 حل مشكلة الكيبورد
// =======================
window.addEventListener("resize", () => {
    document.body.style.height = window.innerHeight + "px";
});
// 🔥 حل نهائي لمشكلة اختفاء الهيدر
function fixViewport() {
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.body.style.height = vh + "px";
}

// أول تحميل
fixViewport();

// عند فتح الكيبورد
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fixViewport);
}

// fallback
window.addEventListener("resize", fixViewport);
