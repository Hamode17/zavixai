// =======================
// زر + (فتح القائمة)
// =======================
const plusBtn = document.getElementById("plusBtn");
const plusMenu = document.getElementById("plusMenu");

plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    plusMenu.style.display = plusMenu.style.display === "flex" ? "none" : "flex";
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {
    if (!plusBtn.contains(e.target) && !plusMenu.contains(e.target)) {
        plusMenu.style.display = "none";
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
// إرسال الرسالة
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
    chatBox.scrollTop = chatBox.scrollHeight;

    // تنظيف الحقل
    input.value = "";
    sendBtn.classList.remove("active");
});


// =======================
// 🔥 الحل النهائي لمشكلة الهيدر + الكيبورد
// =======================

function fixHeaderOnKeyboard() {
    const header = document.querySelector(".header");

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {

            const heightDiff = window.innerHeight - window.visualViewport.height;

            if (heightDiff > 150) {
                // الكيبورد مفتوح
                header.style.position = "fixed";
                header.style.top = "0";
                header.style.width = "100%";
                header.style.zIndex = "9999";
            } else {
                // الوضع الطبيعي
                header.style.position = "sticky";
            }

        });
    }
}

fixHeaderOnKeyboard();


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
