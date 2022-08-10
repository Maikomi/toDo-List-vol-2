const taskList = document.querySelector("ul");
const taskNameInput = document.getElementById("name");
const taskDescriptionInput = document.getElementById("description");
const localTasks = localStorage.getItem("task");
const addButton = document.getElementById("addButton");

const loadTasks = () => {
  if (localStorage.getItem("tasks") == null) return;

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `<article><h3>${task.name}</h3><p>${task.description}</p><div class = "delete" onclick="removeTask(this)">x</div></article>`;
    taskList.insertBefore(li, taskList.children[0]);
  });
};

const addTask = () => {
  const newTaskName = document.getElementById("name").value;
  const newTaskDescription = document.getElementById("description").value;
  if (newTaskName == "") {
    alert("Please name you task");
  } else {
    const newTask = document.createElement("li");
    newTask.innerHTML = `<article><h3>${newTaskName}</h3><p>${newTaskDescription}</p><div class = "delete" onclick="removeTask(this)">x</div></article>`;
    taskList.insertBefore(newTask, taskList.children[0]);
    const task = {
      name: newTaskName,
      description: newTaskDescription,
      completed: false,
    };
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
    localStorage.setItem(
      "tasks",
      JSON.stringify([...JSON.parse(localStorage.getItem("tasks")), task])
    );
  }
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
};

const removeTask = (event) => {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    if (task.name == event.parentNode.children[0].innerHTML) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.parentElement.remove();
  event.parentElement.remove();
};

addButton.addEventListener("click", addTask);
window.addEventListener("load", loadTasks);

const clear_me = () => {
  localStorage.clear();
  location.reload();
};

const btn = document.getElementById("die");
btn.addEventListener("click", clear_me);
