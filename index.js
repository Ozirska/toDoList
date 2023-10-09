const input = document.querySelector(".task-input");
const button = document.querySelector(".create-task-btn");
const listElem = document.querySelector(".list");

////////////  STORE LIST  /////////////////
const storage = (text) => {
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.push({
    text,
    done: false,
    id: Math.random().toString(),
  });

  localStorage.setItem("taskList", JSON.stringify(taskList));

  input.value = "";
};

////////////////   UPDATE LIST /////////////////
const updateTask = (taskId, done) => {
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.forEach((obj) => {
    if (obj.id == taskId) {
      obj.done = done;
    }
  });

  localStorage.setItem("taskList", JSON.stringify(taskList));
};

const checkboxTask = (e) => {
  const isCheckbox = e.target.classList.contains("list__item-checkbox");
  if (!isCheckbox) {
    return;
  }
  const taskId = e.target.id;
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  const done = e.target.checked;

  updateTask(taskId, done);

  listElem.innerHTML = "";
  genereteList();
};

//////////////  DELETE TASK  ////////////////

const onDeleteTask = (event) => {
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  let filteredTaskList = taskList.filter((obj) => obj.id !== event.target.id);

  localStorage.setItem("taskList", JSON.stringify(filteredTaskList));
  genereteList();
};

/////////////   WRITE LIST OF TASK  ///////////////

const genereteList = () => {
  let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  console.log(taskList);

  const tasksElems = taskList
    .sort((a, b) => b.done - a.done)
    .map(({ text, done, id }) => {
      const listItemElem = document.createElement("li");

      listItemElem.classList.add("list__item");
      const checkbox = document.createElement("input");
      checkbox.id = id;
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = done;
      checkbox.classList.add("list__item-checkbox");
      if (done) {
        listItemElem.classList.add("list__item_done");
      }
      checkbox.addEventListener("click", checkboxTask);

      const deleteBtnElem = document.createElement("button");
      deleteBtnElem.id = id;
      deleteBtnElem.classList.add("deleteBtn");
      deleteBtnElem.addEventListener("click", onDeleteTask);

      listItemElem.append(checkbox, text, deleteBtnElem);

      return listItemElem;
    });
  listElem.innerHTML = "";
  listElem.append(...tasksElems.reverse());
};

////////// //// FIRST ACTION  ////////////////////
genereteList();
/////////////////////////////////////////////

const createTask = (event) => {
  event.preventDefault();
  if (input.value === "") {
    return;
  }
  storage(input.value.trim());
  genereteList();
};

button.addEventListener("click", createTask);
