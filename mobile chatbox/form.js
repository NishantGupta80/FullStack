function callUs() {
    const phoneNumber = "+919955361210";
    window.location.href = "tel:+919955361210";
}

function chatWithUs() {
    const chatLink = "https://your-chat-link.com";
    window.open(chatLink, "_blank");
}

function mailUs() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (name.trim() === '' || message.trim() === '') {
        alert("Please fill in both fields before sending an email.");
        return;
    }

    const subject = encodeURIComponent("Message from " + name);
    const body = encodeURIComponent(message);
    const email = "youremail@example.com";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
