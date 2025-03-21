document.getElementById("expenseForm").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("expenseForm");
    const amount = form.elements["amount"].value;
    const description = form.elements["description"].value;
    const category = form.elements["category"].value;
    const id = form.dataset.editingId || Date.now().toString();

    const expense = { id, amount, description, category };
    localStorage.setItem(id, JSON.stringify(expense));

    form.reset();
    delete form.dataset.editingId;
    displayExpenses();
}

function getExpensesFromLocalStorage() {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const expense = JSON.parse(localStorage.getItem(key));
        if (expense && expense.amount && expense.description && expense.category) {
            expenses.push(expense);
        }
    }
    return expenses;
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    const expenses = getExpensesFromLocalStorage();

    expenses.forEach((expense) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
            <span><strong>₹${expense.amount}</strong> - ${expense.description} (${expense.category})</span>
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="editExpense('${expense.id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense('${expense.id}')">Delete</button>
            </div>
        `;
        expenseList.appendChild(listItem);
    });
}

function deleteExpense(id) {
    localStorage.removeItem(id);
    displayExpenses();
}

function editExpense(id) {
    const expense = JSON.parse(localStorage.getItem(id));
    if (expense) {
        const form = document.getElementById("expenseForm");
        form.elements["amount"].value = expense.amount;
        form.elements["description"].value = expense.description;
        form.elements["category"].value = expense.category;
        form.dataset.editingId = id;
    }
}

document.addEventListener("DOMContentLoaded", displayExpenses);
