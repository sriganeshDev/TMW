# Task Management System with Role-Based Access and Analytics

A full-stack MERN application that provides comprehensive task and project management capabilities with role-based access control and real-time analytics.

## ✨ Features

### Core Functionality

/

- **Authentication & Authorization**

  - JWT-based secure login/registration
  - Password hashing with bcrypt
  - Role-based access control (Admin/Member)
  - Protected routes on both frontend and backend

- **Project & Task Management**

  - Complete CRUD operations for projects and tasks
  - Task assignment and reassignment
  - Task status tracking (To Do, In Progress, Done)
  - Due date management
  - Project-task relationship management

- **Analytics Dashboard**

  - Pie chart showing task status distribution
  - Line/bar charts for task completion trends
  - User-wise task analytics
  - Real-time data visualization

- **User Interface**
  - Responsive mobile-first design
  - Clean and intuitive UI/UX
  - Kanban-style task board (optional)
  - Accessibility considerations

### Optional Features

- Admin dashboard with user management
- Advanced task filtering options

## 🛠 Technology Stack

### Frontend

- **React.js** - UI library
- **React Router DOM** - Navigation and routing
- **Axios** - HTTP client for API communication
- **Tailwind CSS** / **Material UI** - Styling framework
- **Recharts** - Data visualization
- **Formik** - Form management

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JSON Web Token (JWT)** - Authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

## Frontend

task-management-system/
├── backend/
│ ├── config/
│ │ └── ConnectDb.js
│ ├── controllers/
│ │ ├── UserController.js
│ │ ├── projectController.js
│ │ ├── taskController.js
│ │ └── AdminDashBoardController.js
│ │ └── UserDashBoardController.js
│ ├── middleware/
│ │ ├── Multer.js
│ │ └── UserAuthToken.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Project.js
│ │ └── Task.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── projects.js
│ │ ├── tasks.js
│ │ └── users.js
│ │ └── Dashboard.js
│ ├── utils/
│ │ └── MailSender.js
│ ├── .env
│ ├── index.js
│

## Backnend

├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Auth/
│ │ │ ├── Dashboard/
│ │ │ ├── Projects/
│ │ │ ├── ReusableComponents/
│ │ │ ├── Tasks/
│ │ │ └── Todo/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── utils/
│ │ ├── services/
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── tailwind.config.js
│
├── README.md
└── .gitignore

````

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository


### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env

# Start the backend server
npm run dev
````

The backend server will start on `http://localhost:7000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend application will start on `http://localhost:3000`

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env

# Database Configuration

# DATABASE_CLUSTER_ID
# PORT

# JWT Configuration

JWT_SECRET
JWT_EXPIRE

# Email Configuration (for notifications)

# MAIL_APP_KEY
# MAIL_SMTP
# MAIL_PORT
```

### Admin Role

- **Full Access:** Can perform all operations
- **User Management:** View , Create and manage all users
- **Project Management:** Create, edit, delete all projects
- **Task Management:** Create, assign, edit, delete all tasks
- **Analytics:** Access to all analytics data

### Member Role

- **Limited Access:** Can only access assigned tasks
- **Task Management:** View and edit only assigned tasks
- **Project Viewing:** Can view projects they're involved in
- **Analytics:** Can view personal task statistics

## 🔑 Sample Credentials

### Admin User

- **Email:** sri715565@gmail.com
- **Password:** sri@123

### Member Users

- **Email:** member1@taskmanager.com
- **Password:** member123
- **Role:** Member

- **Email:** gayathridhamodharan7321@gmail.com
- **Password:**gaya@123

## 📖 Usage Guide

### Getting Started

1. **Registration/Login**

   - Access the application at `http://localhost:3000`
   - Register a new account or use sample credentials
   - Upon successful login, you'll be redirected to the dashboard

2. **Dashboard Overview**

   - View task statistics and recent activities
   - Quick access to projects and tasks
   - Analytics charts showing progress

3. **Project Management (Admin)**

   - Navigate to Projects section
   - Create new projects with title, description, and due date
   - Edit or delete existing projects

4. **Task Management**

   - Create tasks within projects
   - Assign tasks to team members (Admin)
   - Update task status: To Do → In Progress → Done
   - Set due dates and priorities

5. **Analytics**
   - View pie charts for task status distribution
   - Monitor completion trends over time
   - Track user-wise performance metrics

### Key Features Usage

#### Kanban Board

- Drag and drop tasks between status columns
- Visual representation of project progress
- Real-time updates across users

#### Filtering & Search

- Filter tasks by status, due date
- Search functionality for quick task finding
- Sort by priority, due date, or creation date
