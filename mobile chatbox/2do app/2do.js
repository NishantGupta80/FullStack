document.addEventListener('DOMContentLoaded', () => {
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const tasksUl = document.getElementById('tasks');
taskForm.addEventListener('submit', (e) => {
e.preventDefault();
        
const taskText = taskInput.value.trim();
if (taskText === '') return;

const li = document.createElement('li');
li.innerHTML = `
<span>${taskText}</span>
<div>
<button class="complete-btn">✔️</button>
<button class="delete-btn">❌</button>
</div>`;
tasksUl.appendChild(li);
taskInput.value = '';
li.querySelector('.complete-btn').addEventListener('click', () => {
li.querySelector('span').classList.toggle('completed');
});
li.querySelector('.delete-btn').addEventListener('click', () => {
tasksUl.removeChild(li);
});
});
});
