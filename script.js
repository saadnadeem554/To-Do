class todo {
    title;
    description;
    dueDate;
    priority;
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

}
class Projects {
    project;
    todos = [];
    constructor(project) {
        this.project = project;
    }
    addTodos(todo) {
        this.todos.push(todo);
    }
}
class UI {
    static displayalltodos(projects) {
        const list = document.querySelector("#todo-list");
        list.innerHTML = ""; // Clear existing todos
        projects.forEach((project) => UI.addProjectTodos(project));
    }

    static displayProjectTodos(project) {
        const list = document.querySelector("#todo-list");
        list.innerHTML = ""; // Clear existing todos
        UI.addProjectTodos(project);
    }

    static addProjectTodos(project) {
        const list = document.querySelector("#todo-list");
        project.todos.forEach(todo => {
            const listItem = document.createElement("li");
            listItem.classList.add("todo-item");
            listItem.innerHTML = `
            <h3>${todo.title}</h3>
            <p><strong>Description:</strong> ${todo.description}</p>
            <p><strong>Due Date:</strong> ${todo.dueDate}</p>
            <p><strong>Priority:</strong> ${todo.priority}</p>
           <button class="delete" data-title="${todo.title}">Delete</button>
            `;
            list.appendChild(listItem);
        });

        // Add event listeners for delete buttons
        UI.addDeleteEventListeners();
    }

    static addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll(".todo-item .delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const title = e.target.getAttribute("data-title");
                UI.deleteTodo(title);
            });
        });
    }

    static deleteTodo(title) {
        // Find the project containing the todo
        projects.forEach(project => {
            const todoIndex = project.todos.findIndex(todo => todo.title === title);
            if (todoIndex !== -1) {
                // Remove the todo from the project
                project.todos.splice(todoIndex, 1);
                // Re-display the todos
                UI.displayalltodos(projects);
            }
        });
    }
    
    static AddProject(projects) {
        const modalOverlay = document.createElement("div");
        modalOverlay.classList.add("modal-overlay");

        const form = document.createElement("form");
        form.classList.add("form");

        const h2 = document.createElement("h2");
        h2.textContent = "Add a New Project";

        const title = document.createElement("input");
        title.type = "text";
        title.placeholder = "Title";
        title.required = true;

       
        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Submit";

        const cancel = document.createElement("button");
        cancel.textContent = "Cancel";
        cancel.classList.add("cancel");
        cancel.type = "button";
        cancel.addEventListener("click", () => modalOverlay.remove());

        form.appendChild(h2);
        form.appendChild(title);
        form.appendChild(submit);
        form.appendChild(cancel);

        modalOverlay.appendChild(form);
        document.body.appendChild(modalOverlay);
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let newProject = new Projects(title.value);
            projects.push(newProject);
            addProjectButtons();
            modalOverlay.remove();
        });
        
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
    }

    static addTodo(projects) {
        const modalOverlay = document.createElement("div");
        modalOverlay.classList.add("modal-overlay");

        const form = document.createElement("form");
        form.classList.add("form");

        const h2 = document.createElement("h2");
        h2.textContent = "Add a TO DO";

        const title = document.createElement("input");
        title.type = "text";
        title.placeholder = "Title";
        title.required = true;

        const description = document.createElement("input");
        description.type = "text";
        description.placeholder = "Description";
        description.required = true;

        const dueDate = document.createElement("input");
        dueDate.type = "date";
        dueDate.placeholder = "Due Date";
        dueDate.required = true;

        const priority = document.createElement("select");
        priority.required = true;

        const option1 = document.createElement("option");
        option1.value = "High";
        option1.textContent = "High";

        const option2 = document.createElement("option");
        option2.value = "Low";
        option2.textContent = "Low";

        priority.appendChild(option1);
        priority.appendChild(option2);

        const projectSelect = document.createElement("select");
        projectSelect.required = true;
        projects.forEach((project) => {
            const option = document.createElement("option");
            option.value = project.project;
            option.textContent = project.project;
            projectSelect.appendChild(option);
        });

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Submit";

        const cancel = document.createElement("button");
        cancel.textContent = "Cancel";
        cancel.classList.add("cancel");
        cancel.type = "button";
        cancel.addEventListener("click", () => modalOverlay.remove());

        form.appendChild(h2);
        form.appendChild(title);
        form.appendChild(description);
        form.appendChild(dueDate);
        form.appendChild(priority);
        form.appendChild(projectSelect);
        form.appendChild(submit);
        form.appendChild(cancel);

        modalOverlay.appendChild(form);
        document.body.appendChild(modalOverlay);
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let newTodo = new todo(
                title.value,
                description.value,
                dueDate.value,
                priority.value
            );
            projects.forEach((project) => {
                if (project.project === projectSelect.value) {
                    project.addTodos(newTodo);
                    UI.displayProjectTodos(project);
                }
            });
            modalOverlay.remove();
        });

        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
    }
}
let projects = [];
let project1 = new Projects("Routine");
let project2 = new Projects("University");
projects.push(project1);
projects.push(project2);

let todo1 = new todo("Brush", "Brush twice a day", "2021-07-01", "low");
let todo2 = new todo("Revision", "Revise for 1 hour", "2021-07-02", "high");

project1.addTodos(todo1);
project2.addTodos(todo2);

alltodos = document.querySelector(".all-todo");
alltodos.addEventListener("click", () => UI.displayalltodos(projects));

document.addEventListener('DOMContentLoaded', () => {
    
    addProjectButtons();
    UI.displayalltodos(projects);
});

function addProjectButtons() {
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML = "";
    projects.forEach((project, index) => {
        const button = document.createElement("button");
        button.textContent = project.project;
        button.addEventListener("click", () => UI.displayProjectTodos(project));
        projectList.appendChild(button);
    });
}

addProjec = document.querySelector(".add-project");
addProjec.addEventListener("click", () => UI.AddProject(projects));
addTod = document.querySelector(".add-todo");
addTod.addEventListener("click", () => UI.addTodo(projects));

