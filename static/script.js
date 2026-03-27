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

/* 🔥 FIX نهائي بدون أي اهتزاز */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    let lastOffsetTop = 0;
    let lastKeyboard = 0;

    function update() {

        const viewport = window.visualViewport;

        const offsetTop = Math.round(viewport.offsetTop);
        const keyboardHeight = Math.round(window.innerHeight - viewport.height);
        const isZoomed = viewport.scale > 1;

        // 🛑 إذا ماكو تغيير → لا تسوي شي (هذا يمنع الرجفة)
        if (offsetTop === lastOffsetTop && keyboardHeight === lastKeyboard) {
            return;
        }

        lastOffsetTop = offsetTop;
        lastKeyboard = keyboardHeight;

        // 🟡 في حالة الزوم
        if (isZoomed) {
            header.style.transform = "translateY(0)";
            inputContainer.style.transform = "translateY(0)";
            return;
        }

        // 🟢 تثبيت الهيدر
        header.style.transform = `translateY(${offsetTop}px)`;

        // 🟢 رفع الانبوت فقط عند الكيبورد
        if (keyboardHeight > 120) {
            inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
        } else {
            inputContainer.style.transform = "translateY(0)";
        }
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);

    // تشغيل أولي
    requestAnimationFrame(update);
}

fixUI();
