# Node MySQL User CRUD App

A simple **User Management System** built with:

- **Node.js**
- **Express.js**
- **MySQL**
- **EJS (Embedded JavaScript Templates)**

It allows you to **view**, **edit (with password validation)**, and **delete** users securely from a MySQL database.

---

## 🚀 Features

- View total number of users
- Display all users in a table
- Edit a user’s username (requires password)
- Delete a user (requires password)
- Responsive UI with basic CSS
- Clean URL routing using Express and Method-Override

---

## ⚙️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Node.js    | Backend runtime |
| Express.js | Web server framework |
| MySQL      | Relational database |
| EJS        | Templating engine |
| Method-Override | HTTP method support for PATCH/DELETE via forms |
| CSS        | Styling (in `public/style.css`) |

---

## 📂 Project Structure

├── index.js # Main Express server
├── views/ # EJS templates
│ ├── home.ejs
│ ├── showusers.ejs
│ ├── edit.ejs
├── public/
│ └── style.css # Custom CSS styling
├── .gitignore
├── package.json
└── README.md

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/swasthikk/node-mysql-user-crud.git
cd node-mysql-user-crud

npm install
