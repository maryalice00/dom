document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const newTodoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');

    // Load todos from local storage
    loadTodos();

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const todoText = newTodoInput.value.trim();
        if(todoText.length > 0) {
            addTodo(todoText);
            newTodoInput.value = '';
            saveTodos();
        }
    });

    todoList.addEventListener('click', function(e) {
        if(e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            saveTodos();
        } else if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
            saveTodos();
        }
    });
});

function addTodo(todoText) {
    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

function saveTodos() {
    const todos = [];
    const todoListItems = document.querySelectorAll('#todoList li');
    todoListItems.forEach(item => {
        todos.push({
            text: item.textContent.replace('Delete', '').trim(),
            completed: item.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if(savedTodos && savedTodos.length > 0) {
        savedTodos.forEach(todo => {
            const li = addTodo(todo.text);
            if(todo.completed) {
                li.classList.add('completed');
            }
        });
    }
}
