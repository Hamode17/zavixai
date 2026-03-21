const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat-box");

// تفعيل زر الإرسال
input.addEventListener("input", () => {
    sendBtn.style.color = input.value.trim() ? "black" : "gray";
});

// إرسال رسالة
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    // رد
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "🤖 جاري التفكير...";
    chatBox.appendChild(botMsg);

    // تمرير
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";
});
