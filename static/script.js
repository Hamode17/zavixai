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

/* 🔥 حل الكيبورد (احترافي وثابت) */

function handleKeyboard() {
const inputContainer = document.querySelector(".input-container");

let lastHeight = window.innerHeight;  

if (window.visualViewport) {  
    window.visualViewport.addEventListener("resize", () => {  

        const currentHeight = window.visualViewport.height;  
        const keyboardHeight = window.innerHeight - currentHeight;  

        // 🔥 فقط عند فتح الكيبورد  
        if (keyboardHeight > 120 && currentHeight < lastHeight) {  
            inputContainer.style.bottom = keyboardHeight + "px";  
        }   
        // 🔥 عند إغلاق الكيبورد  
        else if (keyboardHeight < 50) {  
            inputContainer.style.bottom = "0px";  
        }  

        lastHeight = currentHeight;  
    });  
}

}

handleKeyboard();
