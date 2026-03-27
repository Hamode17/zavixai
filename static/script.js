const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

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
/* 🔥 تثبيت الهيدر + رفع الأيقونة مع الكيبورد */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const input = document.querySelector(".input-container");

    function update() {

        const viewport = window.visualViewport;

        const offsetTop = viewport.offsetTop;
        const keyboardHeight = window.innerHeight - viewport.height;

        // ✅ تثبيت الهيدر (لا يختفي)
        header.style.transform = `translateY(${offsetTop}px)`;

        // ✅ رفع الأيقونة فوق الكيبورد
        if (keyboardHeight > 100) {
            input.style.transform = `translateY(-${keyboardHeight - offsetTop}px)`;
        } else {
            input.style.transform = `translateY(0px)`;
        }
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);
}

fixUI();
