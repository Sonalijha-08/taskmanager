const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required and cannot be empty' });
    }

    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate,
      category: category ? category.trim() : ''
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate, category } = req.body;

    // Only validate title if it's being provided in the update
    if (title !== undefined && (!title || title.trim() === '')) {
      return res.status(400).json({ message: 'Title is required and cannot be empty' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Prevent marking already completed task as completed again
    if (completed && task.completed) {
      return res.status(400).json({ message: 'Task is already marked as completed' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : '';
    if (completed !== undefined) updateData.completed = completed;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (category !== undefined) updateData.category = category ? category.trim() : '';

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;