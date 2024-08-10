import Todo from '../models/todo.model.js';

// Approve a todo
const approveTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findByIdAndUpdate(todoId, { approved: true }, { new: true });
        
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        
        res.json(todo);
    } catch (error) {
        console.error('Error approving todo:', error);
        res.status(500).send('Failed to approve todo');
    }
};

// Unapprove a todo
const unapproveTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findByIdAndUpdate(todoId, { approved: false }, { new: true });
        
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        
        res.json(todo);
    } catch (error) {
        console.error('Error unapproving todo:', error);
        res.status(500).send('Failed to unapprove todo');
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findByIdAndDelete(todoId);
        
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Failed to delete todo');
    }
};

// Update a todo
const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const updates = req.body; // Ensure validation for update fields
        const todo = await Todo.findByIdAndUpdate(todoId, updates, { new: true });
        
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        
        res.json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send('Failed to update todo');
    }
};

// Get a todo by ID
const getTodoById = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todo.findById(todoId);
        
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        
        res.json(todo);
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).send('Failed to fetch todo');
    }
};

// Get all todos for a user
const getAllTodos = async (req, res) => {
    try {
        const user = req.user; // Assuming you have a middleware that sets req.user from session
        const todos = await Todo.find({ userId: user._id });
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Failed to fetch todos');
    }
};

// Filter todos
const getFilteredTodos = async (req, res) => {
    try {
        const filters = req.query; // Assuming filters are sent as query parameters
        const todos = await Todo.find(filters);
        res.json(todos);
    } catch (error) {
        console.error('Error filtering todos:', error);
        res.status(500).send('Failed to filter todos');
    }
};

// Mark all todos as approved/unapproved
const markAllTodos = async (req, res) => {
    try {
        const { status } = req.body; // Status should be true or false
        const user = req.user;
        const todos = await Todo.updateMany(
            { userId: user._id },
            { approved: status },
            { new: true }
        );
        
        res.json({ message: `Todos have been ${status ? 'approved' : 'unapproved'}` });
    } catch (error) {
        console.error('Error marking todos:', error);
        res.status(500).send('Failed to mark todos');
    }
};

export {
    approveTodo,
    unapproveTodo,
    deleteTodo,
    updateTodo,
    getTodoById,
    getAllTodos,
    getFilteredTodos,
    markAllTodos
};
