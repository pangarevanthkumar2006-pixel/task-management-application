function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "revanth@gmail.com" && password === "1234") {
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid Login");
    }
}

async function createTask() {
    alert("task saved");

    const ID =
        document.getElementById("ID").value;
    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;





    alert("Task Created Successfully");
}


async function getTasks() {
    alert("task found");

    let response = await fetch("/tasks");

    let tasks = await response.json();

    let html = "";

    tasks.forEach(task => {
        html += `<p>${task.title}</p>`;
    });

    document.getElementById("taskList").innerHTML = html;
}

async function updateTask() {

    let id = prompt("Task ID");
    let title = prompt("New Title");

    await fetch(`/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    alert("Task Updated");
}

async function deleteTask() {

    let id = prompt("Task ID");

    await fetch(`/tasks/${id}`, {
        method: "DELETE"
    });

    alert("Task Deleted");
}