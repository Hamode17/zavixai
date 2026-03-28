/* العناصر الأساسية */
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

/* 🔥 عناصر السايدبار */
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const chatHistory = document.getElementById("chatHistory");
const newChatBtn = document.getElementById("newChat");

/* ========================= */
/* 🔥 فتح واغلاق القائمة */
/* ========================= */

openSidebar.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
};

closeSidebar.onclick = closeMenu;
overlay.onclick = closeMenu;

function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

/* ========================= */
/* 💬 ارسال رسالة */
/* ========================= */

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

    addMessage("user-msg", text);

    input.innerText = "";

    addMessage("bot-msg", "جاري التفكير...");

    saveChat(text); // 🔥 حفظ الدردشة

    scrollDown();
}

/* ========================= */
/* 🔥 اضافة رسالة */
/* ========================= */

function addMessage(type, text) {
    const msg = document.createElement("div");
    msg.className = type;
    msg.innerText = text;
    chatBox.appendChild(msg);
}

/* ========================= */
/* 🔥 حفظ الدردشات */
/* ========================= */

function saveChat(text) {
    let chats = JSON.parse(localStorage.getItem("zavix_chats")) || [];

    chats.unshift(text); // نحفظ اخر رسالة

    localStorage.setItem("zavix_chats", JSON.stringify(chats));

    renderChats();
}

/* ========================= */
/* 🔥 عرض الدردشات */
/* ========================= */

function renderChats() {
    chatHistory.innerHTML = "";

    let chats = JSON.parse(localStorage.getItem("zavix_chats")) || [];

    chats.forEach(chat => {
        const item = document.createElement("div");
        item.className = "chat-item";
        item.innerText = chat;

        item.onclick = () => {
            chatBox.innerHTML = "";
            addMessage("user-msg", chat);
            addMessage("bot-msg", "جاري التفكير...");
            closeMenu();
        };

        chatHistory.appendChild(item);
    });
}

/* ========================= */
/* 🔥 دردشة جديدة */
/* ========================= */

newChatBtn.onclick = () => {
    chatBox.innerHTML = "";
    addMessage("bot-msg", "👋 مرحباً! كيف أساعدك؟");
    closeMenu();
};

/* ========================= */
/* 🔥 Scroll */
/* ========================= */

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ========================= */
/* 🔥 نظام تثبيت احترافي */
/* ========================= */

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

/* تشغيل عند فتح الصفحة */
renderChats();
