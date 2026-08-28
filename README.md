# 🚀 TaskFlow MongoDB REST API

A database-driven REST API built with **Node.js, Express.js, MongoDB Atlas, and Mongoose** for managing tasks and categories.

## 📚 Week 5 Project

This project demonstrates:

* NoSQL document modeling
* MongoDB Atlas cloud database
* Mongoose schemas and validations
* Document relationships
* Persistent CRUD operations
* MongoDB population
* Centralized error handling
* REST API architecture

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS
* dotenv
* Morgan
* Postman
* Nodemon

## 📁 Project Structure

```text
week5-mongodb-api/
│
├── config/
│   └── db.js
│
├── models/
│   ├── Task.js
│   └── Category.js
│
├── controllers/
│   ├── taskController.js
│   └── categoryController.js
│
├── routes/
│   ├── taskRoutes.js
│   └── categoryRoutes.js
│
├── middleware/
│   └── errorHandler.js
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
```

The `.env` file must not be uploaded to GitHub.

## ▶️ Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

## ❤️ Health Check

```http
GET /health
```

## 📂 Category API

### Get all categories

```http
GET /api/categories
```

### Get single category

```http
GET /api/categories/:id
```

### Create category

```http
POST /api/categories
```

Example body:

```json
{
  "name": "Development",
  "description": "Software development related tasks"
}
```

### Update category

```http
PUT /api/categories/:id
```

### Delete category

```http
DELETE /api/categories/:id
```

## ✅ Task API

### Get all tasks

```http
GET /api/tasks
```

### Get single task

```http
GET /api/tasks/:id
```

### Create task

```http
POST /api/tasks
```

Example:

```json
{
  "title": "Build MongoDB API",
  "description": "Complete Week 5 database driven REST API",
  "status": "in-progress",
  "priority": "high",
  "category": "CATEGORY_ID"
}
```

### Update task

```http
PUT /api/tasks/:id
```

### Delete task

```http
DELETE /api/tasks/:id
```

## 🔗 Document Relationship

The project contains two linked MongoDB models:

### Category

Stores category information.

### Task

Stores task information and references a Category using MongoDB ObjectId.

Tasks use Mongoose `populate()` to return complete category information.

Example:

```json
"category": {
  "_id": "CATEGORY_ID",
  "name": "Development",
  "description": "Software development related tasks"
}
```

## 🧪 HTTP Status Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| 200         | Successful GET, PUT or DELETE  |
| 201         | Resource successfully created  |
| 400         | Validation error / bad request |
| 404         | Resource not found             |
| 500         | Internal server/database error |

## 🧪 Postman Testing

The API was tested using Postman.

Tested operations include:

* Create Category → `201 Created`
* Get Categories → `200 OK`
* Create Task → `201 Created`
* Get Tasks → `200 OK`
* Get Single Task → `200 OK`
* Update Task → `200 OK`
* Delete Task → `200 OK`
* Invalid Task → `400 Bad Request`
* Deleted Task → `404 Not Found`

## 💾 Persistent Database

Unlike the previous in-memory API, this project stores data permanently in **MongoDB Atlas**.

Data remains available after:

* Page refresh
* Server restart
* API restart

## 🔒 Security

Sensitive MongoDB credentials are stored in environment variables and `.env` is excluded from Git using `.gitignore`.

## 👩‍💻 Project

**TaskFlow MongoDB REST API**

Week 5 Backend Development Project

Built with Node.js + Express + MongoDB Atlas + Mongoose.
