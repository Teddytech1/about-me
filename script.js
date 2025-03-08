document.addEventListener("DOMContentLoaded", function() {
  // Visitor Counter using localStorage
  let count = localStorage.getItem("visitorCount") || 0;
  count++;
  localStorage.setItem("visitorCount", count);
  if(document.getElementById("visitorCount")) {
    document.getElementById("visitorCount").textContent = "Visitor Count: " + count;
  }

  // Display current time and visitor's time zone
  const now = new Date();
  if(document.getElementById("visitorTime")) {
    document.getElementById("visitorTime").textContent = "Current Time: " + now.toLocaleTimeString();
  }
  if(document.getElementById("visitorTimeZone")) {
    document.getElementById("visitorTimeZone").textContent = "Your Time Zone: " + Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // Sign Up Form Submission
  const signupForm = document.getElementById("signupForm");
  if(signupForm) {
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      localStorage.setItem("signedUp", JSON.stringify({ username, email }));
      alert("Sign up successful! You can now access the Live Q&A.");
      window.location.href = "liveqa.html";
    });
  }
});

// Quiz Submission and evaluation
function submitQuiz() {
  const answer1 = document.getElementById("q1").value.trim().toLowerCase();
  const answer2 = document.getElementById("q2").value.trim().toLowerCase();
  let result = "";
  if(answer1 === "application programming interface" || answer1 === "api") {
    result += "<p>Question 1: Correct!</p>";
  } else {
    result += "<p>Question 1: Incorrect. Hint: API stands for Application Programming Interface.</p>";
  }
  if(answer2.includes("html")) {
    result += "<p>Question 2: Correct! HTML is used for structuring web pages.</p>";
  } else {
    result += "<p>Question 2: Incorrect. Hint: Think of the markup language for web pages.</p>";
  }
  document.getElementById("quizResult").innerHTML = result;
}

// Live Chat functionality with simple responses
function sendChat() {
  const chatInput = document.getElementById("chatInput");
  const question = chatInput.value.trim();
  if(!question) return;
  appendMessage("user", question);
  chatInput.value = "";
  setTimeout(() => {
    const response = generateChatResponse(question);
    appendMessage("bot", response);
  }, 500);
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chatBox");
  const para = document.createElement("p");
  para.className = sender;
  para.textContent = message;
  chatBox.appendChild(para);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateChatResponse(query) {
  query = query.toLowerCase();
  if(query.includes("hello") || query.includes("hi")) {
    return "Hello! How can I help you today?";
  } else if(query.includes("technology") || query.includes("programming")) {
    return "Technology and programming are vast topics. What specifically would you like to know?";
  } else if(query.includes("whatsapp")) {
    return "WhatsApp bots are innovative tools that automate communication. Would you like more details?";
  } else {
    return "I'm here to assist you. Could you please provide more details?";
  }
}

// Open repository link in a new window/tab.
function openRepo(url) {
  window.open(url, "_blank");
}

// Prompt user to enter a photo URL (simulate reading a photo)
function openPhotoPrompt() {
  const photoURL = prompt("https://files.catbox.moe/aad6wc.jpg");
  if(photoURL) {
    window.open(photoURL, "_blank");
  }
}
