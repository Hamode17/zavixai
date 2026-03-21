// =======================
// زر + (فتح القائمة بانيميشن)
// =======================
const plusBtn = document.getElementById("plusBtn");
const plusMenu = document.getElementById("plusMenu");

plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    plusMenu.classList.toggle("show");
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
    if (!plusBtn.contains(e.target) && !plusMenu.contains(e.target)) {
        plusMenu.classList.remove("show");
    }
});


// =======================
// زر الإرسال يتغير عند الكتابة
// =======================
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat-box");

input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        sendBtn.classList.add("active");
    } else {
        sendBtn.classList.remove("active");
    }
});


// =======================
// إرسال الرسالة (محادثة حقيقية)
// =======================
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);

    // رد AI مؤقت
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = "🤖 جاري التفكير...";
    chatBox.appendChild(botMsg);

    // سكرول تلقائي
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

    // تنظيف الحقل
    input.value = "";
    sendBtn.classList.remove("active");
});


// =======================
// الأكواد القديمة (نخليها)
// =======================
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}

function newChat() {
    alert("تم بدء دردشة جديدة");
}

function logout() {
    window.location.href = "/logout";
}
// =======================
// 🔥 حل مشكلة اختفاء الهيدر (مهم جدا)
// =======================

window.addEventListener("resize", () => {
    const header = document.querySelector(".header");

    if (window.innerHeight < 500) {
        // الكيبورد مفتوح
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.width = "100%";
    } else {
        // الوضع الطبيعي
        header.style.position = "sticky";
    }
});
