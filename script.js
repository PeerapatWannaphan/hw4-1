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

    function deleteExpense(id) {
        let expenses = getExpenses();
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses(expenses);
        renderExpenses();
    }

    function editExpense(id, updatedData) {
        let expenses = getExpenses();
        const index = expenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            expenses[index] = { ...expenses[index], ...updatedData };
            saveExpenses(expenses);
            renderExpenses();
        }
    }

    function renderExpenses() {
        if (!expenseList) return;
        expenseList.innerHTML = "";
        const expenses = getExpenses();
        expenses.forEach(expense => {
            const div = document.createElement("div");
            div.classList.add("p-3", "border", "rounded", "bg-gray-50", "relative");

            div.innerHTML = `
                <strong>${expense.title}</strong> - ${expense.amount}฿ (${expense.category}) <br> ${expense.date}
                <button onclick="deleteExpense(${expense.id})" class="absolute top-2 right-2 text-red-600">ลบ</button>
                <button onclick="editExpensePrompt(${expense.id})" class="absolute top-2 right-16 text-blue-600">แก้ไข</button>
            `;
            expenseList.appendChild(div);
        });
    }

    function editExpensePrompt(id) {
        const expenses = getExpenses();
        const expense = expenses.find(expense => expense.id === id);
        if (expense) {
            const newTitle = prompt("แก้ไขหัวข้อ:", expense.title);
            const newAmount = prompt("แก้ไขจำนวนเงิน:", expense.amount);
            const newDate = prompt("แก้ไขวันที่:", expense.date);

            // ตัวเลือกหมวดหมู่
            const categoryOptions = ["อาหาร", "เดินทาง", "ช็อปปิ้ง", "อื่นๆ"];
            let newCategory = expense.category; // ค่าเริ่มต้นเป็นหมวดหมู่เดิม

            // แสดงตัวเลือกหมวดหมู่
            let categoryInput = "";
            categoryOptions.forEach((option, index) => {
                categoryInput += `${index + 1}. ${option}\n`;
            });
            const selectedCategory = prompt(
                `แก้ไขหมวดหมู่:\n${categoryInput}\nกรุณาเลือกหมายเลข (1-4):`,
                categoryOptions.indexOf(expense.category) + 1
            );

            // ตรวจสอบว่าผู้ใช้เลือกหมวดหมู่ถูกต้องหรือไม่
            if (selectedCategory >= 1 && selectedCategory <= 4) {
                newCategory = categoryOptions[selectedCategory - 1];
            } else {
                alert("กรุณาเลือกหมายเลขหมวดหมู่ให้ถูกต้อง (1-4)");
                return;
            }

            if (newTitle && newAmount && newDate) {
                editExpense(id, {
                    title: newTitle,
                    amount: newAmount,
                    category: newCategory,
                    date: newDate
                });
            }
        }
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
                renderExpenses();
            }
        });
    }

    renderExpenses();

    // ทำให้ฟังก์ชัน deleteExpense และ editExpensePrompt สามารถเรียกใช้ได้จาก global scope
    window.deleteExpense = deleteExpense;
    window.editExpensePrompt = editExpensePrompt;
});