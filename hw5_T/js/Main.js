/*
Bài tập Quản lý Task cá nhân:
Chức năng: 

     1. Thêm task

     2. Xoá task 

     3. Cập nhật nôi dung task

     4. Thay đổi trạng thái task (Hoàn thành hay chưa)

     5. Validation input
*/

var taskList = [];
var completedList = [];

// Function 1: Thêm task
function addTask() {
  const taskId = Date.now().toString();
  const taskTitle = document.getElementById("taskTitle").value;
  const taskStatus = false;

  // Validation form
  var isValid = true;
  isValid &= checkRequired(taskTitle, "titleError");

  if (isValid) {
    const newTask = new Task(taskId, taskTitle, taskStatus);
    taskList.push(newTask);

    // In danh sách Tasks chưa hoàn thành
    renderData(taskList, "tbodyTask");

    // Lưu ds Tasks chưa hoàn thành vào local
    saveData("taskList", taskList);

    // Clear form
    document.getElementById("btnReset").click();
  }
}

// Phím Enter để thêm task
function addTaskEnter(event) {
  if (event.keyCode === 13) {
    document.getElementById("btnAdd").click();
  }
}

// Function 2: Hiển thị tasks ra màn hình
function renderData(data, idContent) {
  var htmlContent = "";
  for (var i = 0; i < data.length; i++) {
    const currentTask = data[i];
    htmlContent += `
        <tr>
            <td>${currentTask.taskTitle}</td>
            <td class="text-right">
                <button class="btn btn-feature" onclick="deleteTask('${currentTask.taskId}')">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-feature" onclick="getTask('${currentTask.taskId}')">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-task-status" onclick="setStatus('${currentTask.taskId}')">
                    <i class="fa fa-check"></i>
                </button>
            </td>
        </tr>
  `;
  }
  document.getElementById(idContent).innerHTML = htmlContent;
}

// Function 3: Lưu trữ dữ liệu vào localStorage
function saveData(item, data) {
  localStorage.setItem(item, JSON.stringify(data));
}

// Function 4: Lấy dữ liệu từ localStorage và in ra màn hình ngay khi load
function fetchData() {
  // Danh sách tasks chưa hoàn thành
  const localTaskList = localStorage.getItem("taskList");
  // Kiểm tra tồn tại
  if (localTaskList) {
    // chuyển lại từ chuỗi ra object
    mapData(JSON.parse(localTaskList), taskList);
    renderData(taskList, "tbodyTask");
  }

  // Tasks đã hoàn thành
  const localCompList = localStorage.getItem("completedList");
  if (localCompList) {
    mapData(JSON.parse(localCompList), completedList);
    renderData(completedList, "tbodyCompleted");
  }
}

// Function 5: Xóa task
function deleteTask(id) {
  // Tìm vị trí qua id findById
  const indexTask = findById(id, taskList);
  const indexCompleted = findById(id, completedList);
  if (indexTask === -1 && indexCompleted === -1) {
    alert("Something went wrong!");
  } else {
    if (indexTask !== -1) {
      taskList.splice(indexTask, 1);
      saveData("taskList", taskList);
      renderData(taskList, "tbodyTask");
    }
    if (indexCompleted !== -1) {
      completedList.splice(indexCompleted, 1);
      saveData("completedList", completedList);
      renderData(completedList, "tbodyCompleted");
    }
  }
}

// Function 6: Lấy dữ liệu của task muốn sửa, đưa lên form
function getTask(id) {
  // DS Tasks chưa hoàn thành
  // Duyệt ds tasks, tìm vị trí task muốn sửa
  const indexTask = findById(id, taskList);
  if (indexTask !== -1) {
    const updateTask = taskList[indexTask];

    // Đưa thông tin lên form
    document.getElementById("taskTitle").value = updateTask.taskTitle;
    document.getElementById("taskId").value = updateTask.taskId;

    // Ẩn nút thêm, hiển thị nút sửa
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "inline";
  }

  // DS Tasks đã hoàn thành
  const indexCompleted = findById(id, completedList);
  if (indexCompleted !== -1) {
    const updateTask = completedList[indexCompleted];

    // Đưa thông tin lên form
    document.getElementById("taskTitle").value = updateTask.taskTitle;
    document.getElementById("taskId").value = updateTask.taskId;

    // Ẩn nút thêm, hiển thị nút sửa
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btnUpdate").style.display = "inline";
  }
}

// Function 7: Chỉnh sửa thông tin task
function updateTask() {
  const allTask = taskList.concat(completedList);
  // 1. Lấy lại thông tin trên form
  const taskId = document.getElementById("taskId").value;

  // 2. Dựa vào id, tìm vị trí trong mảng => cập nhật thuộc tính
  const index = findById(taskId, allTask);

  if (index < taskList.length) {
    // Tasks chưa hoàn thành
    taskList[index].taskTitle = document.getElementById("taskTitle").value;
    swal("Cập nhật thành công!", "Task đã được cập nhật", "success");

    renderData(taskList, "tbodyTask");
    saveData("taskList", taskList);
  } else {
    // Tasks đã hoàn thành
    completedList[index - taskList.length].taskTitle = document.getElementById(
      "taskTitle"
    ).value;
    swal("Cập nhật thành công!", "Task đã được cập nhật", "success");

    renderData(completedList, "tbodyCompleted");
    saveData("completedList", completedList);
  }

  // Clear form
  document.getElementById("btnReset").click();

  document.getElementById("btnAdd").style.display = "inline";
  document.getElementById("btnUpdate").style.display = "none";
}

// Function 8: Chuyển đổi trạng thái task: chưa hoàn thành <=> đã hoàn thành
function setStatus(id) {
  // Lấy vị trí của task qua id
  const indexTask = findById(id, taskList);
  const indexCompleted = findById(id, completedList);

  // Kiểm tra tồn tại
  if (indexTask === -1 && indexCompleted === -1) {
    alert("Something went wrong!");
  } else {
    // Chưa hoàn thành => đã hoàn thành
    if (indexTask !== -1) {
      // Set status cho task thành true
      taskList[indexTask].taskStatus = true;

      // Push task vào ds đã hoàn thành
      completedList.push(taskList[indexTask]);
      saveData("completedList", completedList);
      renderData(completedList, "tbodyCompleted");

      // Xóa task khỏi ds chưa hoàn thành
      taskList.splice(indexTask, 1);
      saveData("taskList", taskList);
      renderData(taskList, "tbodyTask");
    }
    // Đã hoàn thành => chưa hoàn thành
    if (indexCompleted !== -1) {
      // Set status cho task thành false
      completedList[indexCompleted].taskStatus = false;

      // Push task vào ds chưa hoàn thành
      taskList.push(completedList[indexCompleted]);
      saveData("taskList", taskList);
      renderData(taskList, "tbodyTask");

      // Xóa task khỏi ds đã hoàn thành
      completedList.splice(indexCompleted, 1);
      saveData("completedList", completedList);
      renderData(completedList, "tbodyCompleted");
    }
  }
}

// Function: chuyển đổi dữ liệu từ local thành dữ liệu mới
function mapData(data, arr) {
  for (var i = 0; i < data.length; i++) {
    // đối tượng Task cũ từ local: data[i]
    // => chuyển thành đối tượng task mới: newTask
    const newTask = new Task(
      data[i].taskId,
      data[i].taskTitle,
      data[i].taskStatus
    );
    arr.push(newTask);
  }
}

// Function: Tìm task theo id
function findById(id, data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].taskId === id) {
      return i;
    }
  }
  return -1;
}

fetchData();

// --------------------------VALIDATION--------------------------
function checkRequired(value, errorId) {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).innerHTML = "*Trường này bắt buộc nhập";
  return false;
}
