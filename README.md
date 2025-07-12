# StackIt – A Minimal Q&A Forum Platform

## 🧠 Overview

**StackIt** is a minimal question-and-answer platform that supports collaborative learning and structured knowledge sharing. It’s designed to be simple, user-friendly, and focused on the core experience of asking and answering questions within a community.

---

## 🚀 Features

- 🧾 User Authentication (Signup/Login using JWT)
- ✍️ Post Questions and Answers
- 👍 Upvote/Downvote Questions and Answers
- 📚 View All Questions or Single Question with Answers
- 🔐 Admin Routes for Moderation
- ⚙️ RESTful API built using Flask + MongoDB

---

## 🛠 Tech Stack

- **Backend Framework:** Flask (Python)
- **Database:** MongoDB (with PyMongo)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **API Testing:** Postman (recommended)

---

## 📂 Project Structure

```
stackit_backend/
├── api/
│   └── index.py              # Main Flask app with all routes
├── .env                      # Environment variables (Mongo URI, Secret Key)
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/stackit-backend.git
cd stackit-backend
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set up `.env`

Create a `.env` file in the root:

```
SECRET_KEY=your-secret-key
MONGO_URI=mongodb://localhost:27017/stackit
```

### 4. Run the App

```bash
python api/index.py
```

Visit: `http://localhost:5000/api/health` for health check.

---

## 📬 API Endpoints (Brief)

| Method | Endpoint                               | Description                         |
|--------|----------------------------------------|-------------------------------------|
| POST   | `/api/auth/signup`                     | Register a new user                 |
| POST   | `/api/auth/login`                      | Log in and receive a JWT token      |
| POST   | `/api/questions`                       | Post a new question                 |
| GET    | `/api/questions`                       | Get all questions                   |
| GET    | `/api/questions/<id>`                  | Get question with answers           |
| POST   | `/api/questions/<id>/answers`          | Post an answer                      |
| POST   | `/api/vote`                            | Upvote/downvote a post              |
| PATCH  | `/api/admin/questions/<id>/close`      | Admin: close a question             |

---

## 🧪 Postman Testing

Use the following JSON for signup:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

You can use Postman to test login, post questions, and more using Bearer JWT authentication.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Contributing

Feel free to fork this repo, open issues, or submit pull requests to contribute!

---

## 💡 Future Ideas

- Full-text search
- Email verification & password reset
- Tags & trending questions
- User dashboard with stats

---
