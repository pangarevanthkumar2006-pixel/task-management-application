const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Task = require("./task");

const app = express();

app.use(cors());
app.use(express.json());
app.post("/tasks", async (req, res) => {

    const task = await Task.create(req.body);

    res.json(task);

});

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
    .then(() => {
        console.log("MongoDB Connected");
    });

app.post("/tasks", async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});