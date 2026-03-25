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

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 الحل الحقيقي (نفس ChatGPT) */

function setupViewportFix() {

    if (!window.visualViewport) return;

    function update() {
        const vv = window.visualViewport;

        const keyboardHeight = window.innerHeight - vv.height;

        // ✅ فقط نحرك للأسفل
        inputContainer.style.bottom = keyboardHeight + "px";
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);

    update();
}

setupViewportFix();
