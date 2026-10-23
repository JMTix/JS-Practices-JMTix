//JMTix

const addTaskButton = document.querySelector("#add-task");
const deleteButton = document.querySelector("#delete-button");

const taskList = document.querySelector(".task-list");

function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

//Task HTMl
const taskElement = elementFromHtml(`
        <li>
           <div class="task-element">

                <input type="checkbox" id="task-checkbox">

                <p contenteditable="true" class="task-text"> New task </p>

                <button id="delete-button"> Delete </button>
           </div>
        </li>
    `);

const taskClone = taskElement.cloneNode(true);

//Event

taskList.appendChild(taskElement);
addTaskButton.addEventListener("click", function () {
  taskList.appendChild(taskClone.cloneNode(true));
});

taskList.addEventListener("click", function (del) {
  const button = del.target.closest("#delete-button");
  if (!button) return;

  const container = button.closest(".task-element");

  if (container) {
    container.remove();
  } else {
    console.log("container not found");
  }
});

taskList.addEventListener("change", function (check) {
  const button = check.target.closest("#task-checkbox");
  if (!button) return;

  const taskText = button.closest(".task-element").querySelector(".task-text");
  if (button.checked) {
    taskText.style.textDecoration = "line-through";
  } else {
    taskText.style.textDecoration = "none";
  }
});
