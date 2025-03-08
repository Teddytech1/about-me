const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage: storage });

// Temporary user data
let users = [];
let visitorCount = 0;

// Visitor count middleware
app.use((req, res, next) => {
  visitorCount++;
  next();
});

// Home Route
app.get('/', (req, res) => {
  const currentTime = new Date().toLocaleString();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  res.render('index', { visitorCount, currentTime, timezone });
});

// Register Route
app.post('/register', (req, res) => {
  const { name, email, username, password } = req.body;
  users.push({ name, email, username, password });
  res.redirect('/');
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send('Login Successful');
  } else {
    res.send('Invalid Credentials');
  }
});

// File upload
app.post('/upload', upload.single('mediaFile'), (req, res) => {
  const mediaUrl = `/uploads/${req.file.filename}`;
  res.json({ mediaUrl });
});

// Chatbot interaction with ChatGPT
app.post('/chatbot', async (req, res) => {
  const message = req.body.message;
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    res.status(500).send('Error with ChatGPT');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
