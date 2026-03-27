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

/* 🔥 نظام احترافي عالمي (بدون تخريب الزوم + بدون اهتزاز) */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    let isFirstRun = true; // 🔥 منع اهتزاز أول مرة

    function update() {

        const viewport = window.visualViewport;

        const offsetTop = viewport.offsetTop;
        const keyboardHeight = window.innerHeight - viewport.height;
        const isZoomed = viewport.scale > 1;

        // 🔥 تجاهل أول تنفيذ لتجنب الاهتزاز
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }

        // 🟡 في حالة الزوم → لا نتدخل
        if (isZoomed) {
            header.style.transform = "translateY(0)";
            inputContainer.style.transform = "translateY(0)";
            return;
        }

        // 🟢 تثبيت الهيدر
        header.style.transform = `translateY(${offsetTop}px)`;

        // 🟢 رفع الأيقونة عند الكيبورد فقط
        if (keyboardHeight > 120) {
            inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
        } else {
            inputContainer.style.transform = "translateY(0)";
        }
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);

    // تشغيل بدون اهتزاز
    setTimeout(update, 50);
}

fixUI();
