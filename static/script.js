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

/* 🔥 حل الكيبورد (احترافي + يدعم الزوم) */

function handleKeyboard() {
    const inputContainer = document.querySelector(".input-container");

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {

            const viewportHeight = window.visualViewport.height;
            const keyboardHeight = window.innerHeight - viewportHeight;

            // 👇 فقط إذا الكيبورد مفتوح
            if (keyboardHeight > 120) {
                inputContainer.style.bottom = keyboardHeight + "px";
            } else {
                inputContainer.style.bottom = "0px";
            }

        });
    }
}

handleKeyboard();

/* 🔥 الحل النهائي لمنع تحرك الأيقونة */

/* ❌ نمنع سحب الأيقونة نفسها فقط */
const inputContainer = document.querySelector(".input-container");

inputContainer.addEventListener("touchmove", function(e) {
    e.stopPropagation(); // 👈 مهم بدل preventDefault
}, { passive: true });

/* ❌ منع سحب الصفحة فقط أثناء الكتابة */
document.addEventListener("touchmove", function(e) {
    if (document.activeElement === input) {
        e.stopPropagation(); // 👈 الحل الصحيح
    }
}, { passive: true });
