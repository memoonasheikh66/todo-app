const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body.task;
    tasks.push(newTask);
    res.json({ message: 'Task added successfully.' });
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;
    tasks[taskId] = updatedTask;
    res.json({ message: 'Task updated successfully.' });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks.splice(taskId, 1);
    res.json({ message: 'Task deleted successfully.' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
