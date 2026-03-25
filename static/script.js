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
chatBox.scrollTop = chatBox.scrollHeight;
}

/* 🔥 حل الكيبورد (ثابت ومحسّن) */

function handleKeyboard() {
const inputContainer = document.querySelector(".input-container");

if (window.visualViewport) {  
    window.visualViewport.addEventListener("resize", () => {  
        const keyboardHeight = window.innerHeight - window.visualViewport.height;  

        if (keyboardHeight > 100) {  
            inputContainer.style.bottom = keyboardHeight + "px";  
        } else {  
            inputContainer.style.bottom = "0px";  
        }  
    });  
}

}

handleKeyboard();

/* 🔥🔥 الحل الحقيقي لمنع تحرك الأيقونة */

const inputContainer = document.querySelector(".input-container");

// ❌ منع سحب الأيقونة نفسها
inputContainer.addEventListener("touchmove", function(e) {
e.preventDefault();
}, { passive: false });

// ❌ منع تحريك الصفحة لما تكتب
document.addEventListener("touchmove", function(e) {
if (document.activeElement === input) {
e.preventDefault();
}
}, { passive: false });
