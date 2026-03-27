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

    // 🔥 مهم جدًا للموبايل
    setTimeout(scrollDown, 150);
}

/* 🔥 FIX عرض الرسائل مع الكيبورد */

function scrollDown() {

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);

    requestAnimationFrame(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

/* 🔥 FIX بدون اهتزاز + بدون تخريب */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    let lastKeyboard = 0;

    function update() {

        const viewport = window.visualViewport;

        const keyboardHeight = Math.round(window.innerHeight - viewport.height);
        const isZoomed = viewport.scale > 1;

        // 🟡 في حالة الزوم
        if (isZoomed) {
            inputContainer.style.transform = "translateY(0)";
            return;
        }

        // 🛑 منع التكرار (يوقف الرجفة)
        if (keyboardHeight === lastKeyboard) return;

        lastKeyboard = keyboardHeight;

        // 🟢 نحرك الانبوت فقط (الهيدر ثابت)
        if (keyboardHeight > 120) {
            inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
        } else {
            inputContainer.style.transform = "translateY(0)";
        }

        // 🔥 بعد الحركة ننزل الشات
        setTimeout(scrollDown, 100);
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);

    requestAnimationFrame(update);
}

fixUI();
