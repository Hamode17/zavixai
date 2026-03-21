// =======================
// زر + (فتح القائمة)
// =======================
const plusBtn = document.getElementById("plusBtn");
const plusMenu = document.getElementById("plusMenu");

plusBtn.addEventListener("click", () => {
    if (plusMenu.style.display === "flex") {
        plusMenu.style.display = "none";
    } else {
        plusMenu.style.display = "flex";
    }
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

input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        sendBtn.classList.add("active");
    } else {
        sendBtn.classList.remove("active");
    }
});


// =======================
// زر الإرسال (تجريبي الآن)
// =======================
sendBtn.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        alert("تم إرسال الرسالة: " + input.value);
        input.value = "";
        sendBtn.classList.remove("active");
    }
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
