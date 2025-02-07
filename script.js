// Expenses ko Local Storage se load karna
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
updateExpenseList();

// Expense add karna
function addExpense() {
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;

    if (date === "" || description === "" || amount === "") {
        alert("Please fill all fields!");
        return;
    }

    let expense = { date, description, amount: Number(amount) };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateExpenseList();
}

// Expense list update karna
function updateExpenseList() {
    let list = document.getElementById("expense-list");
    list.innerHTML = "";
    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;
        list.innerHTML += `
            <tr>
                <td>${expense.date}</td>
                <td>${expense.description}</td>
                <td>₹${expense.amount}</td>
                <td><button onclick="deleteExpense(${index})">Delete</button></td>
            </tr>
        `;
    });

    document.getElementById("total-amount").innerText = total;
}

// Expense delete karna
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateExpenseList();
}

// PDF Download Feature
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Daily Expense Report", 70, 15);

    let yPos = 30;
    
    doc.setFontSize(12);
    doc.text("Date", 10, yPos);
    doc.text("Description", 50, yPos);
    doc.text("Amount (₹)", 150, yPos);
    
    doc.line(10, yPos + 2, 190, yPos + 2);
    
    expenses.forEach((expense, index) => {
        yPos += 10;
        doc.setFont("helvetica", "normal");
        doc.text(expense.date, 10, yPos);
        doc.text(expense.description, 50, yPos);
        doc.text("₹" + expense.amount, 150, yPos);
    });

    yPos += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Total: ₹" + document.getElementById("total-amount").innerText, 10, yPos);

    doc.save("Daily_Expense_Report.pdf");
}

document.addEventListener("DOMContentLoaded", function() {
    let today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
    document.getElementById("date").value = today;
});
