const express = require("express");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // for CSS

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "DATA",
  password: "210205",
});

// ROUTES

// Home Page - Show count
app.get("/", (req, res) => {
  const q = `SELECT COUNT(*) AS count FROM user`;
  connection.query(q, (err, result) => {
    if (err) return res.send("Error in DB");
    const count = result[0].count;
    res.render("home", { count });
  });
});

// Show all users
app.get("/users", (req, res) => {
  const q = `SELECT * FROM user`;
  connection.query(q, (err, users) => {
    if (err) return res.send("Error in DB");
    res.render("showusers", { users });
  });
});

// Edit user form
app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;
  const q = `SELECT * FROM user WHERE userId = ?`;
  connection.query(q, [id], (err, result) => {
    if (err) return res.send("Error in DB");
    const user = result[0];
    res.render("edit", { user });
  });
});

// Update user (PATCH)
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const checkUserQuery = `SELECT * FROM user WHERE userId = ?`;

    connection.query(checkUserQuery, [id], (err, results) => {
        if (err) return res.send("DB error");

        if (results.length === 0) return res.send("User not found");

        const user = results[0];

        if (user.password !== password) {
            return res.send("Incorrect password. Update denied.");
        }

        const updateQuery = `UPDATE user SET username = ? WHERE userId = ?`;
        connection.query(updateQuery, [username, id], (err) => {
            if (err) return res.send("Update failed");
            res.redirect("/users");
        });
    });
});


// Delete user (DELETE)
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const selectQuery = `SELECT * FROM user WHERE userId = ?`;

    connection.query(selectQuery, [id], (err, results) => {
        if (err) return res.send("DB error");
        if (results.length === 0) return res.send("User not found");

        const user = results[0];

        if (user.password !== password) {
            return res.send("Incorrect password. Deletion denied.");
        }

        const deleteQuery = `DELETE FROM user WHERE userId = ?`;
        connection.query(deleteQuery, [id], (err) => {
            if (err) return res.send("Delete failed");
            res.redirect("/users");
        });
    });
});


// Start server
app.listen(port, () => {
  console.log(`SERVER STARTED AT PORT: http://localhost:${port}/`);
});
