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

/* 🔥 الحل النهائي (كيبورد + زوم بدون تضارب) */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    function update() {

        const viewport = window.visualViewport;

        const offsetTop = viewport.offsetTop;
        const keyboardHeight = window.innerHeight - viewport.height;
        const isZoomed = viewport.scale > 1;

        // 🟡 وضع الزوم → خلي المتصفح يتحكم
        if (isZoomed) {
            header.style.transform = "none";
            inputContainer.style.transform = "none";
            return;
        }

        // 🟢 الوضع الطبيعي

        // تثبيت الهيدر
        header.style.transform = `translateY(${offsetTop}px)`;

        // رفع الأيقونة فوق الكيبورد
        if (keyboardHeight > 100) {
            inputContainer.style.transform = `translateY(-${keyboardHeight - offsetTop}px)`;
        } else {
            inputContainer.style.transform = `translateY(0px)`;
        }
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);
}

fixUI();
