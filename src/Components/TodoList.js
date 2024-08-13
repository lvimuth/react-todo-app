import React, { useState } from 'react';
import { Trash, Edit, Check } from 'lucide-react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  urgent: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, task: 'Buy milk', completed: false, urgent: false },
    { id: 2, task: 'Walk the dog', completed: false, urgent: true },
    { id: 3, task: 'Do laundry', completed: false, urgent: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask) return;
    setTodos([...todos, { id: todos.length + 1, task: newTask, completed: false, urgent: false }]);
    setNewTask('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditing(true);
    setCurrentTodo(todo);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentTodo) return;
    setTodos(
      todos.map((todo) => (todo.id === currentTodo.id ? { ...todo, task: newTask } : todo))
    );
    setNewTask('');
    setEditing(false);
    setCurrentTodo(null);
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleToggleUrgent = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, urgent: !todo.urgent } : todo))
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </form>
      {editing && currentTodo && (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Edit task"
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </form>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <span
              className={`text-lg ${
                todo.completed ? 'text-green-500 line-through' : todo.urgent ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              {todo.task}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => handleToggleCompleted(todo.id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => handleEdit(todo)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                <Trash size={20} />
              </button>
              <button
                onClick={() => handleToggleUrgent(todo.id)}
                className={`bg-${todo.urgent ? 'red' : 'gray'}-500 hover:bg-${todo.urgent ? 'red' : 'gray'}-700 text-white font-bold py-2 px-4 rounded`}
              >
                {todo.urgent ? 'Urgent' : 'Not Urgent'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;