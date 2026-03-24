const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

/* إرسال رسالة */

sendBtn.onclick = sendMessage;

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    input.value = "";

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

/* 🔥 حل الكيبورد */

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


// =========================
// 🔥 زر تثبيت التطبيق (الإضافة الوحيدة)
// =========================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.createElement("button");
    installBtn.innerText = "📲 تثبيت التطبيق";
    installBtn.style.position = "fixed";
    installBtn.style.bottom = "80px";
    installBtn.style.left = "50%";
    installBtn.style.transform = "translateX(-50%)";
    installBtn.style.padding = "12px 20px";
    installBtn.style.background = "#007bff";
    installBtn.style.color = "#fff";
    installBtn.style.border = "none";
    installBtn.style.borderRadius = "10px";
    installBtn.style.zIndex = "9999";

    document.body.appendChild(installBtn);

    installBtn.addEventListener("click", async () => {
        installBtn.remove();
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        deferredPrompt = null;
    });
});
