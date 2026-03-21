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
// تفعيل زر الإرسال
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

    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "🤖 جاري التفكير...";
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";
    sendBtn.classList.remove("active");
});

// =======================
// 🔥 الحل الحقيقي للكيبورد
// =======================
function fixHeight() {
    document.documentElement.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", fixHeight);
fixHeight();
