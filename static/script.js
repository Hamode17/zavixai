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

    setTimeout(scrollDown, 150);
}

/* 🔥 نزول الشات دائمًا */

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);

    requestAnimationFrame(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

/* 🔥 الحل النهائي (هيدر ثابت 100%) */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    let lastKeyboard = -1;

    // ✅ تثبيت الهيدر مرة واحدة فقط (مهم جدًا)
    header.style.transform = "translateY(0)";
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";

    function update() {

        const viewport = window.visualViewport;

        const keyboardHeight = Math.round(window.innerHeight - viewport.height);
        const isZoomed = viewport.scale > 1;

        // 🟡 في حالة الزوم
        if (isZoomed) {
            inputContainer.style.transform = "translateY(0)";
            return;
        }

        // 🛑 منع الرجفة
        if (keyboardHeight === lastKeyboard) return;

        lastKeyboard = keyboardHeight;

        // ✅ نحرك الانبوت فقط
        if (keyboardHeight > 120) {
            inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
        } else {
            inputContainer.style.transform = "translateY(0)";
        }

        setTimeout(scrollDown, 100);
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);

    requestAnimationFrame(update);
}

fixUI();
