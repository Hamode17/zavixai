const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

/* إرسال */

sendBtn.onclick = sendMessage;

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    input.value = "";

    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "جاري التفكير...";
    chatBox.appendChild(botMsg);

    scrollDown();
}

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 الكيبورد */

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

/* 💬 رسالة مؤقتة */

const tempBtn = document.getElementById("tempMsgBtn");

if (!localStorage.getItem("tempMessageShown")) {

    tempBtn.addEventListener("click", () => {
        const tempMsg = document.createElement("div");
        tempMsg.className = "bot-msg";
        tempMsg.innerText = "🔥 رسالة مؤقتة - لن تظهر مرة أخرى";
        chatBox.appendChild(tempMsg);

        scrollDown();

        localStorage.setItem("tempMessageShown", "true");

        tempBtn.style.opacity = "0.4";
        tempBtn.style.pointerEvents = "none";
    });

} else {
    tempBtn.style.opacity = "0.4";
    tempBtn.style.pointerEvents = "none";
}
