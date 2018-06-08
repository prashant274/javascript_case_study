var Task = function () {
    this.addTask = function (title, date) {
        var providedDate = new Date(date);
        var now = new Date();
        if (title) {
            this.title = title;
        } else {
            throw "task title not provided";
        }
        if (!date) {
            throw "Due date is not provided";
        } else if (providedDate < now) {
            throw "Due date must be future date";
        } else {
            this.date = providedDate;
        }
        this.status = false;
        this.id = tasks.length + 1;
    }
}

var tasks = [];

var handlers = {
    addTask: function () {
        var taskTilte = document.getElementById('taskTitle').value;
        var taskDueDate = document.getElementById('dueDate').value;
        var newTask = new Task();
        try {
            newTask.addTask(taskTilte, taskDueDate);
            tasks.push(newTask);
            console.log(tasks);
        } catch (error) {
            alert(error);
        }
        this.filterTasks();
    },

    deleteTask: function () {
        var allCheckBox = document.getElementsByName('taskChecked');
        allCheckBox.forEach(function (checkBoxItem) {
            if (checkBoxItem.checked === true) {
                var taskIndex = this.findTaskIndexByTaskId(checkBoxItem.id);
                tasks.splice(taskIndex, 1);
            }
        }, this);
        document.getElementById("selectAll").checked = false;
        this.filterTasks();
    },

    updateStatus: function () {
        var allCheckBox = document.getElementsByName('taskChecked');
        allCheckBox.forEach(function (checkBoxItem) {
            if (checkBoxItem.checked === true) {
                var taskIndex = this.findTaskIndexByTaskId(checkBoxItem.id);
                tasks[taskIndex].status = true;
            }
        }, this);
        document.getElementById("selectAll").checked = false;
        this.filterTasks();
    },

    filterTasks: function () {
        var filterCriteria = document.getElementById("filterTasks").value;
        var filteredTask;
        switch (filterCriteria) {
            case "All":
                filteredTask = tasks;
                break;
            case "Completed":
                filteredTask = tasks.filter((task) => task.status).map((CompletedTask) => CompletedTask);
                break;
            case "Incompleted":
                filteredTask = tasks.filter((task) => !task.status).map((CompletedTask) => CompletedTask);
                break;
        }
        view.displayTasks(filteredTask);
    },

    findTaskIndexByTaskId: function (taskId) {
        var taskIndex;
        tasks.forEach(function (task, index) {
            if (task.id == taskId) {
                taskIndex = index;
            }
        });
        return taskIndex;
    }
}


var view = {
    displayTasks: function (filteredTask) {
        var tasktable = document.getElementById('taskTable');
        tasktable.innerHTML = '';
        if (filteredTask.length > 0)
            this.addTableHeader(tasktable);
        filteredTask.forEach(function (task) {
            var taskRow = document.createElement('tr');
            taskRow.appendChild(this.addCheckBox(task.id));
            taskRow.appendChild(this.addTaskTitle(task.title));
            taskRow.appendChild(this.addDueDate(task.date));
            taskRow.appendChild(this.addTaskStatus(task.status));
            tasktable.appendChild(taskRow);
        }, this);

    },

    addTableHeader: function (taskTable) {
        var header = taskTable.createTHead();
        var row = header.insertRow(0);
        var cell = row.insertCell(0);
        cell.innerHTML = "<b>All</b>";
        var selectAllCheckBox = document.createElement('input');
        selectAllCheckBox.setAttribute('type', 'checkBox');
        selectAllCheckBox.setAttribute('onchange', 'view.toggleCheckBoxes()');
        selectAllCheckBox.setAttribute('id', 'selectAll');
        cell.appendChild(selectAllCheckBox);
        var cell1 = row.insertCell(1);
        cell1.innerHTML = "<b>Title</b>";
        var cell2 = row.insertCell(2);
        cell2.innerHTML = "<b>Due Days</b>";
        var cell3 = row.insertCell(3);
        cell3.innerHTML = "<b>Status</b>";
    },

    addCheckBox: function (taskId) {
        var checkBoxTD = document.createElement('td');
        var checkBoxInput = document.createElement('input');
        checkBoxInput.setAttribute('type', 'checkbox');
        checkBoxInput.setAttribute('id', taskId);
        checkBoxInput.setAttribute('name', 'taskChecked');
        checkBoxTD.appendChild(checkBoxInput);
        return checkBoxTD;
    },

    addDueDate: function (taskCompleteDate) {
        var now = new Date();
        var timeDiff = Math.abs(taskCompleteDate.getTime() - now.getTime());
        var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var taskDueDateTD = document.createElement('td');
        taskDueDateTD.textContent = daysLeft + " days";
        return taskDueDateTD;
    },

    addTaskTitle: function (taskTitle) {
        var taskTitleTD = document.createElement('td');
        taskTitleTD.textContent = taskTitle;
        return taskTitleTD;
    },

    addTaskStatus: function (taskStatus) {
        var taskStatusTD = document.createElement('td');
        var taskStatusText;
        if (taskStatus == true) {
            taskStatusText = "Completed";
        } else {
            taskStatusText = "Incomplete";
        }
        taskStatusTD.textContent = taskStatusText;
        return taskStatusTD;
    },

    toggleCheckBoxes: function () {
        var isChecked = document.getElementById('selectAll').checked;
        var allCheckBox = document.getElementsByName('taskChecked');
        allCheckBox.forEach(function (checkBox) {
            checkBox.checked = isChecked;
        }, this);
    }
}
