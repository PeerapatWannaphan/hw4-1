document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    function getExpenses() {
        return JSON.parse(localStorage.getItem("expenses")) || [];
    }

    function saveExpenses(expenses) {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }