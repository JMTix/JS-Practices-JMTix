//JMTix

const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");

let tasks = []; // [{id, task, done}]
const KEY = "taskManager:Task"; 

//Task HTMl
function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

function createTaskElement(task) {
    const li = elementFromHtml(`
    <li>
      <div id="${task.id}" class="task-element">

        <input type="checkbox" class="task-checkbox">

        <p contenteditable="true" class="task-text"></p>

        <button class="delete-button">Delete</button>

      </div>
    </li>
  `);

    const checkbox = li.querySelector(".task-checkbox");
    const taskText = li.querySelector(".task-text");
    
    checkbox.checked = task.done;
    taskText.textContent = task.text;
    taskText.classList.toggle("done", task.done);

    return li;
};

//Functions

function loadTasks() {
  try {
    const data = localStorage.getItem(KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("No se pudo cargar: " + error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch(error) {
    console.log("No se pudo guardar: " + error);
  }
}

function render() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
}




function addTask() {
  
  tasks.push({
    id: `item-${Date.now()}`,
    text: "New task",
    done: false,
  });

  saveTasks();
  render();
}

function completeTask(checkbox) {
  const id = checkbox.closest(".task-element").id;
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.done = checkbox.checked;
  saveTasks();
  render();
}

function eliminateTask(button) {
  const id = button.closest(".task-element").id;
  tasks = tasks.filter((t) => t.id !== id);

  saveTasks();
  render();
}

function updateText(textElement) {
  const id = textElement.closest(".task-element").id;
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.text = textElement.textContent.trim();
  saveTasks();
}
//Events
addTaskButton.addEventListener("click", addTask);

taskList.addEventListener("click", function (del) {
  const button = del.target.closest(".delete-button");
  if (!button) return;
  eliminateTask(button);
});

taskList.addEventListener("change", function (check) {
  const button = check.target.closest(".task-checkbox");
  if (!button) return;
  completeTask(button);
});

taskList.addEventListener("focusout", function(textE) {
  const text = textE.target.closest(".task-text");
  if (!text) return;
  updateText(text)
});

//Start 
tasks = loadTasks();
render();