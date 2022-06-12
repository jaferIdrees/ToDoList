let tasks = [];
window.addEventListener("load", retriveTasks);
function addTask(id, completed, newTask) {
    /* this function receives some text as an argument to add it
    * as new task to the task list*/

    //creating new CheckBox
    const newChckBox = document.createElement("input");
    newChckBox.setAttribute("type", "checkbox");

    if (completed) {
        newChckBox.setAttribute("checked", "");
    }

    //Creating new Span tag
    const newSpan = document.createElement("span");
    newSpan.setAttribute("class", "task");

    //adding the required text to the span tag (the new task)
    let text = document.createTextNode(newTask);
    newSpan.appendChild(text);

    //creating new button
    const newBtn = document.createElement("button");
    newBtn.setAttribute("class", "delete-btn");

    //creating new list item li
    let newLi = document.createElement("li");
    newLi.setAttribute("id",id)
    //appending the new list items to the new record
    newLi.appendChild(newChckBox);
    newLi.appendChild(newSpan);
    newLi.appendChild(newBtn);

    /*adding the new task to the taskList UL on top of it*/
    let taskListElement = document.getElementById("task-list");
    taskListElement.insertBefore(newLi, taskListElement.firstChild);
    //update the delete buttons listeners
    addBtnListeners();
}

//taking action on add task button click
const addTaskBtn = document.getElementById("add-task-button");
addTaskBtn.addEventListener("click", function () {
    let newTaskText = document.getElementById("input-task");
    let id;
    if (newTaskText.innerText !=null) {
        id = Date.now();
        addTask(id, false, newTaskText.value);
        let taskItem = {
            id : id,
            taskDescription : newTaskText.value,
            completed : false,
        }
        tasks.push(taskItem);
        console.log(("Hi"+newTaskText.value))

    }

    newTaskText.value = "";
    document.getElementById("input-task").focus();
    saveList();
})
addBtnListeners();

function addBtnListeners() {
//taking action on delete task button click
    const deleteTaskBtn = document.querySelectorAll(".delete-btn");

    deleteTaskBtn.forEach(function (element) {
        element.addEventListener("click", function () {
            let id = element.parentElement.getAttribute("id");
            let newTasks = [];
            // let delIndex = tasks.findIndex((task) => task.id === id);
            // tasks.splice(delIndex);
            // console.log(delIndex);
            // console.log(tasks);
            tasks.forEach(task => {
                if (task.id != id) newTasks.push(task);
            })
            // console.log("newTasks="+newTasks);
            tasks=newTasks;
            element.parentElement.remove();
            saveList();
            retriveTasks();
        });
    });
}

function saveList() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function retriveTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
}
function renderTasks(){
    if (tasks != null) {
    document.getElementById("task-list").innerHTML = "";
    tasks.forEach(task => {
        addTask(task.id,task.completed, task.taskDescription)
    })}
}