const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const inputContainer = document.querySelector(".input-container");

/* إرسال */

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = input.innerText.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    input.innerText = "";

    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "جاري التفكير...";
    chatBox.appendChild(botMsg);

    scrollDown();
}

/* سكرول */

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 الحل النهائي (ChatGPT Style) */

function handleKeyboard() {

    if (window.visualViewport) {

        window.visualViewport.addEventListener("resize", () => {

            const keyboardHeight = window.innerHeight - window.visualViewport.height;

            if (keyboardHeight > 150) {
                inputContainer.style.bottom = keyboardHeight + "px";
            } else {
                inputContainer.style.bottom = "0px";
            }
        });

        // ✅ مهم جدًا: يخلي الأيقونة تنزل مع الزوم
        window.visualViewport.addEventListener("scroll", () => {
            inputContainer.style.transform =
                `translateY(${window.visualViewport.offsetTop}px)`;
        });
    }
}

handleKeyboard();
