// Variables 
var taskInput = document.getElementById('task');
var dateInput = document.getElementById('date');
var timeInput = document.getElementById('time');
var confirmBtn = document.getElementById('confirm');
var resetBtn = document.getElementById('reset')
var newTodosDiv = document.getElementById('todo');
var headerDiv = document.querySelector('.header')
var taskArr = [];
var counterID = 0 // for id in object

// Constructor 

function Todo(id, todo, date, time) {
    this.id = id
    this.todo = todo
    this.date = date
    this.time = time
    this.status = false
}

Todo.prototype.toHTML = function () {
    return (`
                <span id=${this.id}>X</span>
                <p>Your Task Is : ${this.todo}</p>
                <p>Due Date : ${this.date} <br>
                Due Time : ${this.time}</p> `
    )
}

confirmBtn.addEventListener('click', addTask)

function addTask() {
    // in case fields are not filled 
    if (taskInput.value === '' || dateInput.value === '' || timeInput.value === '') {
        var h2 = document.createElement('h2')
        h2.innerText = 'Fill Up All Fields';
        if (taskInput.value === '') {
            taskInput.style.border = '2px solid red'
        } if (dateInput.value === '') {
            dateInput.style.border = '2px solid red'
        } if (timeInput.value === '') {
            timeInput.style.border = '2px solid red'
        }
        timeInput.style.border = '2px solid red'
        headerDiv.append(h2)
        setTimeout(function () {
            h2.innerText = ''
            taskInput.style.border = '2px solid black'
            dateInput.style.border = '2px solid black'
            timeInput.style.border = '2px solid black'
        }, 2000)
    }
    else {
        // Create Task Div
        var div = document.createElement('div');
        div.classList = 'newTodos'
        // Creating Object
        var temp = new Todo(counterID, taskInput.value, dateInput.value, timeInput.value)
        // Calling prototype 
        div.innerHTML = temp.toHTML()
        newTodosDiv.appendChild(div)
        taskArr.push(temp)
        toLocalStorage()
        counterID++
        // Add Remove Event To  Span 
        var span = div.querySelector('span');
        span.addEventListener('click', removeTodo);
        // resetForm()
    }
}
resetBtn.addEventListener('click', resetForm)
// Reset Form 

function resetForm() {
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function toLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskArr))
}

function fromLocalStorage() {
    var temp = localStorage.getItem('tasks');
    var data = JSON.parse(temp)
    if (temp) {
        taskArr = data
    }
}

function removeTodo(e) {
    this.parentNode.parentNode.removeChild(this.parentNode);
    taskArr.splice(e.target.id, 1)

    // Re arrange tasks array
    for (var i = 0; i < taskArr.length; i++) {
        taskArr[i].id = i
        newTodosDiv.querySelectorAll('span')[i].id = i
    }
    localStorage.setItem('tasks', JSON.stringify(taskArr))
    counterID--
}

// Load localStorage Data 

window.addEventListener('load', function () {
    fromLocalStorage()
    for (var i = 0; i < taskArr.length; i++) {
        var div = document.createElement('div');
        div.classList = 'newTodos'
        var temp = new Todo(counterID, taskArr[i].todo, taskArr[i].date, taskArr[i].time)
        div.innerHTML = temp.toHTML()
        newTodosDiv.appendChild(div)
        counterID++
    }
    var span = newTodosDiv.querySelectorAll('span')
    for (var i = 0; i < span.length; i++) {
        span[i].addEventListener('click', removeTodo)
    }
})

