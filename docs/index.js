const allTodo = { Today: [] }
let currProject = 'Today'

class Todo {
    constructor(title, date, priority, isComplete) {
        this.title = title
        this.date = date
        this.priority = priority
        this.isComplete = isComplete
    }
}

function addTodo() {
    const title = document.getElementById('add-title')
    const date = document.getElementById('add-date')
    const priority = document.getElementById('add-priority')
    const isComplete = false
    const todo = new Todo(title.value, date.value, priority.value, isComplete)

    allTodo[getCurrProject()].push(todo)
    title.value = ''
    date.value = ''
    priority.value = ''

    renderAll(allTodo)
    closeInput()
}

function addProject() {
    const project = document.getElementById('add-name')
    changeCurrProject(project.value)

    allTodo[getCurrProject()] = []
    project.value = ''

    renderAll(allTodo)
    closeInput()
}

function deleteTodo(project, todoItem) {
    allTodo[project].splice(todoItem, 1)

    renderAll(allTodo)
}

function editTodo(project, todoItem) {
    document.getElementById('edit-title').value = allTodo[project][todoItem].title
    document.getElementById('edit-date').value = allTodo[project][todoItem].date
    document.getElementById('edit-priority').value = allTodo[project][todoItem].priority
    document.getElementById('edit-todo').value = project + ' ' + todoItem
    document.getElementById('is-complete').checked = allTodo[project][todoItem].isComplete 

    renderEditForm()
}

function saveEdit() {
    const [project, todoItem] = document.getElementById('edit-todo').value.split(' ')

    allTodo[project][todoItem].title = document.getElementById('edit-title').value
    allTodo[project][todoItem].date = document.getElementById('edit-date').value
    allTodo[project][todoItem].priority = document.getElementById('edit-priority').value
    allTodo[project][todoItem].isComplete = document.getElementById('is-complete').checked

    renderAll(allTodo)
    closeInput()
}

function closeInput() {
    document.getElementById('add-form').style.display = 'none'
    document.getElementById('edit-form').style.display = 'none'
    document.getElementById('project-form').style.display = 'none'
}

function changeCurrProject(project) {
    currProject = project
}

function getCurrProject() {
    return currProject
}

function renderAddForm() {
    document.getElementById('add-form').style.display = 'block'
}

function renderEditForm() {
    document.getElementById('edit-form').style.display = 'block'
}

function renderProjectForm () {
    document.getElementById('project-form').style.display = 'block'
}

function renderPriority(todoItem, row) {
    if(todoItem.priority === 'high') {
        row.style.backgroundColor = 'lightcoral'
    } else if(todoItem.priority === 'medium') {
        row.style.backgroundColor = 'skyBlue'
    } else if(todoItem.priority === 'low') {
        row.style.backgroundColor = 'lightgreen'
    } else {
        row.style.backgroundColor = 'none'
    }
}

function renderComplete(todoItem, row) {
    todoItem.isComplete ? row.style.textDecoration = 'line-through' : row.style.textDecoration = 'none'
}

function renderAll(data) {
    const projectDiv = document.getElementById('project-div')
    const tbody = document.getElementById('todos')
    const submitProject = document.getElementById('project-submit')
    const submitAdd =document.getElementById('add-submit')
    const submitEdit = document.getElementById('edit-submit')
    const icon = document.querySelectorAll('a')
    const addBtn = document.getElementById('add-todo')
    const proBtn = document.getElementById('add-project')

    addBtn.addEventListener('click', renderAddForm)
    proBtn.addEventListener('click', renderProjectForm)
    submitProject.addEventListener('click', addProject)
    submitAdd.addEventListener('click', addTodo)
    submitEdit.addEventListener('click', saveEdit)
    icon.forEach(item => item.addEventListener('click', closeInput))
    
    projectDiv.innerHTML = ''
    tbody.innerHTML = ''

    for(const key in data) {
        const projectName = document.createElement('button')
        projectName.innerText = key
        projectName.dataset.prop = key
        projectDiv.appendChild(projectName)
    }

    projectDiv.addEventListener('click', (e) => {
        const current = e.target.dataset.prop

        changeCurrProject(current)
        renderAll(allTodo)
    })

    const project = getCurrProject()

    const projectName = document.getElementById('project-name')
    projectName.innerText = project

    allTodo[project].forEach((item, index) => {
        const editBtn = document.createElement('button')
        editBtn.innerText = 'edit'
        editBtn.addEventListener('click', () => { editTodo(project, index) })

        const delBtn = document.createElement('button')
        delBtn.innerText = 'delete'
        delBtn.addEventListener('click', () => { deleteTodo(project, index) })

        let tr = tbody.insertRow()

        let td0 = tr.insertCell(0)
        let completeInput = document.createElement('input')
        completeInput.type = 'checkbox'
        completeInput.checked = item.isComplete
        completeInput.addEventListener('click', (e) => {
            item.isComplete = e.target.checked
            renderComplete(item, tr)
        })
        completeInput.style.height = '20px'
        completeInput.style.width = '20px'
        td0.style.width = '30px'
        td0.appendChild(completeInput)

        let td1 = tr.insertCell(1)
        let title = document.createTextNode(`${item.title}`)
        td1.appendChild(title)

        let td2 = tr.insertCell(2)
        let date = document.createTextNode(`${item.date}`)
        td2.appendChild(date)

        let td3 = tr.insertCell(3)
        td3.style.width = '60px'
        td3.appendChild(editBtn)

        let td4 = tr.insertCell(4)
        td4.style.width = '60px'
        td4.appendChild(delBtn)

        renderPriority(item, tr)
        renderComplete(item, tr)
    })

}

renderAll(allTodo)