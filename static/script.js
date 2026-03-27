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

/* تمرير للأسفل */

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 النظام النهائي (بدون تضارب) */

function setupViewportSystem() {
    if (!window.visualViewport) return;

    let lastHeight = window.innerHeight;

    window.visualViewport.addEventListener("resize", () => {

        const viewport = window.visualViewport;
        const keyboardHeight = window.innerHeight - viewport.height;
        const isZoomed = viewport.scale > 1;

        if (isZoomed) {
            // 🔵 وضع الزوم (المتصفح يتحكم)
            document.body.classList.remove("locked");

            inputContainer.style.position = "absolute";
            inputContainer.style.bottom = "0px";

        } else {
            // 🟢 الوضع الطبيعي (تثبيت كامل)
            document.body.classList.add("locked");

            inputContainer.style.position = "fixed";

            if (keyboardHeight > 120 && viewport.height < lastHeight) {
                inputContainer.style.bottom = keyboardHeight + "px";
            } else {
                inputContainer.style.bottom = "0px";
            }
        }

        lastHeight = viewport.height;

    });

    // 🔥 تشغيل القفل أول مرة
    document.body.classList.add("locked");
}

setupViewportSystem();
