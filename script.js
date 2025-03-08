document.addEventListener("DOMContentLoaded", function() {
  // Display signup modal if the visitor is not signed up
  if(!localStorage.getItem("signedUp")) {
    document.getElementById("signupModal").style.display = "block";
  }
  
  // Visitor Counter: Retrieve, increment, and store visitor count in localStorage.
  let count = localStorage.getItem("visitorCount") || 0;
  count++;
  localStorage.setItem("visitorCount", count);
  document.getElementById("visitorCount").textContent = "Visitor Count: " + count;

  // Display current time and visitor's time zone.
  const now = new Date();
  document.getElementById("visitorTime").textContent = "Current Time: " + now.toLocaleTimeString();
  document.getElementById("visitorTimeZone").textContent = "Your Time Zone: " + Intl.DateTimeFormat().resolvedOptions().timeZone;
});

// Signup Form Submission: Save user info to localStorage and close the modal.
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  localStorage.setItem("signedUp", JSON.stringify({ username: username, email: email }));
  closeSignupModal();
});

// Close signup modal
function closeSignupModal() {
  document.getElementById("signupModal").style.display = "none";
}

// Quiz Submission: Evaluate quiz answers and provide ChatGPT‑style feedback.
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
    result += "<p>Question 2: Correct! HTML is the primary markup language for creating web pages.</p>";
  } else {
    result += "<p>Question 2: Incorrect. Hint: Think of the markup language used to structure web content.</p>";
  }
  document.getElementById("quizResult").innerHTML = result;
}

// Live Chat: Send a user question and simulate a ChatGPT‑style response.
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
    return "Hello there! How can I assist you today?";
  } else if(query.includes("technology") || query.includes("programming")) {
    return "Technology and programming are vast fields. What specific topic interests you?";
  } else if(query.includes("whatsapp")) {
    return "WhatsApp bots are an innovative tool to automate conversations. Would you like to know more about their integration?";
  } else {
    return "I'm here to help. Please provide more details so I can assist you better.";
  }
}

// Open repository link in a new tab.
function openRepo(url) {
  window.open(url, "_blank");
}
