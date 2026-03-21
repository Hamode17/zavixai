const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

/* إرسال رسالة */

sendBtn.onclick = sendMessage;

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    input.value = "";

    // رد وهمي
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "جاري التفكير...";
    chatBox.appendChild(botMsg);

    scrollDown();
}

/* تمرير للأسفل */

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 حل الكيبورد (الحل الحقيقي) */

function handleKeyboard() {
    const inputContainer = document.querySelector(".input-container");

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {
            const keyboardHeight = window.innerHeight - window.visualViewport.height;
            inputContainer.style.bottom = keyboardHeight + "px";
        });
    }
}

handleKeyboard();

/* ======================= */
/* 🔥 الرسالة المؤقتة */
/* ======================= */

const chatBtn = document.getElementById("chatNotify");

chatBtn.addEventListener("click", () => {

    // إذا ظهرت قبل لا تظهر مرة ثانية
    if (localStorage.getItem("seenMessage")) return;

    const popup = document.createElement("div");
    popup.innerText = "🚀 قريباً سيتم إضافة نظام الرسائل";

    popup.style.position = "fixed";
    popup.style.top = "70px";
    popup.style.right = "20px";
    popup.style.background = "#111";
    popup.style.color = "#fff";
    popup.style.padding = "10px 15px";
    popup.style.borderRadius = "10px";
    popup.style.zIndex = "9999";
    popup.style.fontSize = "14px";

    document.body.appendChild(popup);

    // تختفي بعد 3 ثواني
    setTimeout(() => {
        popup.remove();
    }, 3000);

    // تخزين أنها ظهرت
    localStorage.setItem("seenMessage", "true");
});
