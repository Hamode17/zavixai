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

/* 🔥 كشف اللغة العالمي (باستخدام franc) */

function detectLanguage(text) {
    try {
        const langCode = window.franc(text || "");

        if (!langCode || langCode === "und") {
            return "Unknown";
        }

        const langMap = {
            ara: "العربية",
            eng: "English",
            fra: "Français",
            spa: "Español",
            deu: "Deutsch",
            rus: "Русский",
            tur: "Türkçe",
            ita: "Italiano",
            jpn: "日本語",
            cmn: "中文",
            hin: "हिन्दी",
            kor: "한국어",
            por: "Português",
            nld: "Nederlands",
            swe: "Svenska",
            pol: "Polski",
            ukr: "Українська",
            ces: "Čeština",
            hun: "Magyar",
            ron: "Română",
            vie: "Tiếng Việt",
            tha: "ไทย",
            ind: "Bahasa Indonesia",
            ben: "বাংলা",
            tam: "தமிழ்",
            tel: "తెలుగు",
            fas: "فارسی",
            urd: "اردو"
        };

        return langMap[langCode] || langCode.toUpperCase();

    } catch (e) {
        return "Unknown";
    }
}

/* 🔥 عرض اللغة */

function showLanguageMessage(lang) {
    const msg = document.createElement("div");
    msg.className = "bot-msg";
    msg.innerText = "🌐 Detected language: " + lang;
    chatBox.appendChild(msg);
}

/* إرسال الرسالة */

function sendMessage() {
    const text = input.innerText.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    input.innerText = "";

    /* 🔥 كشف اللغة */
    const detectedLang = detectLanguage(text);
    showLanguageMessage(detectedLang);

    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "جاري التفكير...";
    chatBox.appendChild(botMsg);

    scrollDown();
}

/* تحسين السكروول */

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
}

/* 🔥 نظام احترافي عالمي (بدون تخريب الزوم) */

function fixUI() {

    if (!window.visualViewport) return;

    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    function update() {

        const viewport = window.visualViewport;

        const offsetTop = viewport.offsetTop;
        const keyboardHeight = window.innerHeight - viewport.height;
        const isZoomed = viewport.scale > 1;

        if (isZoomed) {
            header.style.transform = "translateY(0)";
            inputContainer.style.transform = "translateY(0)";
            return;
        }

        header.style.transform = `translateY(${offsetTop}px)`;

        if (keyboardHeight > 120) {
            inputContainer.style.transform = `translateY(-${keyboardHeight}px)`;
        } else {
            inputContainer.style.transform = "translateY(0)";
        }
    }

    window.visualViewport.addEventListener("resize", update);
    window.visualViewport.addEventListener("scroll", update);

    update();
}

fixUI();
