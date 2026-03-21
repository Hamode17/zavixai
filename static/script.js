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

/* ========================= */
/* 💬 الرسالة المؤقتة */
/* ========================= */

const tempBtn = document.getElementById("tempMsgBtn");

// تحقق إذا ظهرت سابقاً
if (!localStorage.getItem("tempMessageShown")) {

    // عند الضغط
    tempBtn.addEventListener("click", () => {

        // رسالة مؤقتة
        const tempMsg = document.createElement("div");
        tempMsg.className = "bot-msg";
        tempMsg.innerText = "🔥 هذه رسالة مؤقتة! لن تظهر مرة أخرى.";
        chatBox.appendChild(tempMsg);

        scrollDown();

        // حفظ أنها ظهرت
        localStorage.setItem("tempMessageShown", "true");

        // تعطيل الزر
        tempBtn.style.opacity = "0.4";
        tempBtn.style.pointerEvents = "none";
    });

} else {
    // إذا ظهرت سابقاً
    tempBtn.style.opacity = "0.4";
    tempBtn.style.pointerEvents = "none";
}
