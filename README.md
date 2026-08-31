# 🤖 AI Learning Assistant

An AI-powered learning platform designed to help students learn more effectively from their study material. Users can upload PDF documents and use Generative AI to transform the content into **summaries, flashcards, quizzes, and interactive AI conversations**.

The application also provides a personalized dashboard where users can track their documents, flashcards, quizzes, and recent learning activity.

## 🎥 Project Demo

[▶️ Watch the Full Project Demo](https://example.com/project-demo-video)

## 🌟 Key Features

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Email verification using OTP
- OTP-based password reset
- Protected frontend and backend routes

### 📄 Document Management
- Upload PDF study material
- Extract text from uploaded documents
- Store processed documents for future access
- View and manage uploaded learning material

### 🧠 AI-Powered Learning
- Generate summaries from uploaded documents
- Automatically create flashcards
- Generate quizzes based on study material
- Interactive AI chat for asking questions and understanding concepts

### 📊 Learning Dashboard
- Total documents uploaded
- Total flashcard sets generated
- Total quizzes created
- Recent learning activity
- Centralized view of the user's learning progress

### 👤 Profile Management
- View user information
- Update profile details
- Secure logout functionality

## 📸 Screenshots

### Dashboard

![Dashboard](https://example.com/images/dashboard.png)

The dashboard gives users an overview of their learning activity and provides quick access to their generated resources.

### AI Chat

![AI Chat](https://example.com/images/chat.png)

Users can interact with the AI assistant to ask questions and get explanations related to their learning material.

### Document Upload

![Documents](https://example.com/images/documents.png)

Users can upload and manage their PDF study material.

### Flashcards

![Flashcards](https://example.com/images/flashcards.png)

AI-generated flashcards help users revise important concepts from their uploaded documents.

### Quizzes

![Quizzes](https://example.com/images/quizzes.png)

Users can generate and attempt quizzes based on their study material.

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- Tailwind CSS
- Axios
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**AI & Authentication**
- Google Gemini API
- JWT
- bcrypt
- Nodemailer
- Multer

## 🏗️ Application Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    │ Tailwind CSS     │
                    └────────┬─────────┘
                             │
                          REST API
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express + Node   │
                    └───────┬───┬──────┘
                            │   │
                ┌───────────┘   └────────────┐
                ▼                            ▼
        ┌──────────────┐             ┌──────────────┐
        │   MongoDB    │             │ Gemini API   │
        │              │             │              │
        │ Users        │             │ Summaries    │
        │ Documents    │             │ Flashcards   │
        │ Flashcards   │             │ Quizzes      │
        │ Quizzes      │             │ AI Chat      │
        └──────────────┘             └──────────────┘
