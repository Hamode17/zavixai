const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

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
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
}

/* 🔥 فقط كيبورد بدون تخريب */

function handleKeyboard() {
    const inputContainer = document.querySelector(".input-container");

    if (!window.visualViewport) return;

    window.visualViewport.addEventListener("resize", () => {
        const keyboardHeight =
            window.innerHeight - window.visualViewport.height;

        if (keyboardHeight > 100) {
            inputContainer.style.bottom = keyboardHeight + "px";
        } else {
            inputContainer.style.bottom = "0px";
        }
    });
}

handleKeyboard();

/* زر الإرسال */

input.addEventListener("input", () => {
    if (input.innerText.trim().length > 0) {
        sendBtn.classList.add("active");
    } else {
        sendBtn.classList.remove("active");
    }
});
