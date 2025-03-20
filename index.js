
function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    const username = form.elements["username"].value;
    const email = form.elements["email"].value;
    const phone = form.elements["phone"].value;

   

    const user = {
        username,  
        email,
        phone
    };

    localStorage.setItem(user.email, JSON.stringify(user));
    form.reset();
    displayUsers();
}

function getUsersFromLocalStorage() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
            const user = JSON.parse(localStorage.getItem(key));
            if (user && user.username && user.email && user.phone) { 
                users.push(user);
            }
       
    }
    return users;
}

function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    const users = getUsersFromLocalStorage();
    console.log("Retrieved Users:", users); 

    users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;
        userList.appendChild(listItem);
    });
}


document.addEventListener("DOMContentLoaded", displayUsers);


