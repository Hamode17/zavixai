const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const inputContainer = document.querySelector(".input-container");

/* إرسال رسالة */

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

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    input.innerText = "";

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

/* 🔥 نظام ChatGPT الحقيقي */

function handleViewport() {

    let lastHeight = window.innerHeight;

    if (!window.visualViewport) return;

    window.visualViewport.addEventListener("resize", () => {

        const currentHeight = window.visualViewport.height;
        const keyboardHeight = window.innerHeight - currentHeight;
        const isZoomed = window.visualViewport.scale > 1;

        if (isZoomed) {
            // 🟡 وضع الزوم → المتصفح يتحكم
            inputContainer.style.position = "absolute";
            inputContainer.style.bottom = "0px";
        } else {
            // 🟢 الوضع الطبيعي → تثبيت + كيبورد
            inputContainer.style.position = "fixed";

            if (keyboardHeight > 120 && currentHeight < lastHeight) {
                inputContainer.style.bottom = keyboardHeight + "px";
            } else if (keyboardHeight < 50) {
                inputContainer.style.bottom = "0px";
            }
        }

        lastHeight = currentHeight;

    });
}

handleViewport();
