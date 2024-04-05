class TaskManager {
    constructor() {
      this.taskInput = document.getElementById('taskInput');
      this.taskList = document.getElementById('taskList');
      this.addTaskBtn = document.getElementById('addTaskBtn');
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.addTaskBtn.addEventListener('click', () => this.addTask());
      this.taskList.addEventListener('click', (e) => this.handleTaskActions(e));
      this.taskList.addEventListener('dragstart', (e) => this.dragStart(e));
      this.taskList.addEventListener('dragover', (e) => this.dragOver(e));
      this.taskList.addEventListener('drop', (e) => this.drop(e));
      this.renderTasks();
    }
  
    addTask() {
      const taskText = this.taskInput.value.trim();
      if (taskText !== '') {
        this.tasks.push({ text: taskText, completed: false });
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = '';
      } else {
        alert('Please enter a task.');
      }
    }
  
    handleTaskActions(e) {
      const target = e.target;
      if (target.tagName === 'LI') {
        const index = Array.from(this.taskList.children).indexOf(target);
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.renderTasks();
      } else if (target.classList.contains('delete-btn')) {
        const li = target.parentElement;
        const index = Array.from(this.taskList.children).indexOf(li);
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
      }
    }
  
    dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
    }
  
    dragOver(e) {
      e.preventDefault();
    }
  
    drop(e) {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const toIndex = Array.from(this.taskList.children).indexOf(e.target);
      const movedTask = this.tasks.splice(fromIndex, 1)[0];
      this.tasks.splice(toIndex, 0, movedTask);
      this.saveTasks();
      this.renderTasks();
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    renderTasks() {
      this.taskList.innerHTML = '';
      this.tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.id = index;
        li.textContent = task.text;
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
  
        li.appendChild(deleteBtn);
  
        if (task.completed) {
          li.classList.add('completed');
        }
        li.setAttribute('draggable', true);
        this.taskList.appendChild(li);
      });
    }
  }
  
  const taskManager = new TaskManager();
  