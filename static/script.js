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

window.addEventListener("load", () => {

  const input = document.querySelector(".input-container");

  function updateInputPosition() {
    if (!window.visualViewport) return;

    const viewport = window.visualViewport;

    // ✅ حساب ارتفاع الكيبورد بشكل صحيح
    const keyboardHeight = window.innerHeight - (viewport.height + viewport.offsetTop);

    if (keyboardHeight > 0) {
      input.style.bottom = keyboardHeight + "px";
    } else {
      input.style.bottom = "0px";
    }
  }

  // 🔥 عند فتح / غلق الكيبورد
  window.visualViewport.addEventListener("resize", updateInputPosition);

  // 🔥 احتياط لبعض الأجهزة
  window.visualViewport.addEventListener("scroll", updateInputPosition);

});
