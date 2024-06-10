document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if(taskText===''){
            alert("Write Something !😀");
            return;
        }
        if (taskText !== '') {
            const listItem = createTaskElement(taskText, false);
            taskList.appendChild(listItem);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    }

    function createTaskElement(text, completed) {
        const listItem = document.createElement('li');
        if (completed) {
            listItem.classList.add('completed');
        }

        const checkCircle = document.createElement('div');
        checkCircle.classList.add('check-circle');
        if (completed) {
            checkCircle.classList.add('checked');
        }
        checkCircle.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            checkCircle.classList.toggle('checked');
            saveTasks();
        });

        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        taskSpan.classList.add('task-text');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
            saveTasks();
        });

        listItem.appendChild(checkCircle);
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);

        return listItem;
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-text').textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => {
            const listItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(listItem);
        });
    }
});
