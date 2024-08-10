import express from 'express';
import {
	approveTodo,
	unapproveTodo,
	deleteTodo,
	updateTodo,
	getTodoById,
	getAllTodos,
	getFilteredTodos,
	markAllTodos,
} from '../controllers/todolist.controller.js';

const router = express.Router();

// CRUD operations
router.patch('/:todoId/approve', approveTodo);
router.patch('/:todoId/unapprove', unapproveTodo);
router.delete('/:todoId', deleteTodo);
router.patch('/:todoId', updateTodo); // For updating todo details

// Get todos
router.get('/:todoId', getTodoById);
router.get('/', getAllTodos); // Optionally add pagination and sorting
router.get('/filter', getFilteredTodos); // For filtered results

// Mark todos
router.patch('/mark-all', markAllTodos);

export default router;
