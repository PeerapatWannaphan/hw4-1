document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    function getExpenses() {
        return JSON.parse(localStorage.getItem("expenses")) || [];
    }

    function saveExpenses(expenses) {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function addExpense(expenseData) {
        const expenses = getExpenses();
        expenses.push(expenseData);
        saveExpenses(expenses);
    }

    function renderExpenses() {
        if (!expenseList) return;
        expenseList.innerHTML = "";
        const expenses = getExpenses();
        expenses.forEach(expense => {
            const div = document.createElement("div");
            div.classList.add("p-3", "border", "rounded", "bg-gray-50");
            div.innerHTML = `<strong>${expense.title}</strong> - ${expense.amount}฿ (${expense.category}) <br> ${expense.date}`;
            expenseList.appendChild(div);
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value.trim();
            const amount = document.getElementById("amount").value.trim();
            const category = document.getElementById("category").value;
            const date = document.getElementById("date").value;

            if (title && amount && date) {
                addExpense({ id: Date.now(), title, amount, category, date });
                form.reset();
            }
        });
    }

    renderExpenses();
});
