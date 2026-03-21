const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// 🔽 النزول التلقائي
function scrollToBottom() {
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth"
    });
}

// ✉️ إرسال رسالة
function sendMessage() {
    const message = input.value.trim();
    if (message === "") return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = message;

    chatBox.appendChild(userMsg);

    input.value = "";
    sendBtn.classList.remove("active");

    scrollToBottom();

    // رد البوت
    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot-msg";
        botMsg.textContent = "جاري التفكير...";

        chatBox.appendChild(botMsg);
        scrollToBottom();

    }, 600);
}

// زر الإرسال
sendBtn.addEventListener("click", sendMessage);

// Enter للإرسال
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// تفعيل زر الإرسال عند الكتابة
input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        sendBtn.classList.add("active");
    } else {
        sendBtn.classList.remove("active");
    }
});
