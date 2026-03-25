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
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 الحل الصحيح للكيبورد + الزوم */

function handleKeyboard() {
    const inputContainer = document.querySelector(".input-container");

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {

            const viewportHeight = window.visualViewport.height;
            const keyboardHeight = window.innerHeight - viewportHeight;

            // 👇 نحرك باستخدام transform بدل bottom (مهم جدًا)
            if (keyboardHeight > 120) {
                inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
            } else {
                inputContainer.style.transform = "translateY(0)";
            }

        });
    }
}

handleKeyboard();

/* ❌ حذفنا كل أكواد المنع (لأنها تكسر الزوم) */
