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
/* 🔥 تثبيت الهيدر + الايقونة مع الكيبورد */

function fixUIOnKeyboard() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const input = document.querySelector(".input-container");

    function update() {
        const offsetTop = window.visualViewport.offsetTop;

        // 🔥 تثبيت الهيدر
        header.style.transform = `translateY(${offsetTop}px)`;

        // 🔥 تثبيت الايقونة
        input.style.transform = `translateY(${offsetTop}px)`;
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);
}

fixUIOnKeyboard();
