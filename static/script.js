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

/* 🔥 حل الكيبورد (نفس أسلوب ChatGPT) */

function handleKeyboard() {
    const inputContainer = document.querySelector(".input-container");

    if (!window.visualViewport) return;

    function updatePosition() {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;

        const keyboardHeight = windowHeight - viewportHeight;

        // إذا الكيبورد مفتوح
        if (keyboardHeight > 100) {
            inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
        } else {
            inputContainer.style.transform = "translateY(0)";
        }
    }

    window.visualViewport.addEventListener("resize", updatePosition);
    window.visualViewport.addEventListener("scroll", updatePosition);
}

handleKeyboard();

/* 🔥 تحسين تجربة الكتابة */

input.addEventListener("input", () => {
    // تفعيل زر الإرسال
    if (input.innerText.trim().length > 0) {
        sendBtn.classList.add("active");
    } else {
        sendBtn.classList.remove("active");
    }
});

/* 🔥 منع مشاكل التركيز */

input.addEventListener("focus", () => {
    setTimeout(scrollDown, 300);
});
