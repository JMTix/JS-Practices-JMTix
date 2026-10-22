//JMTix

const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");


function elementFromHtml(html) {
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
};

const taskElement = elementFromHtml(`
        <li>
           <div>
                 <p contenteditable="true"> New task </p>
           </div>
        </li>
    `);

taskList.appendChild(taskElement);
addTaskButton.addEventListener("click", function () {
    taskList.cloneNode(taskElement);
});

