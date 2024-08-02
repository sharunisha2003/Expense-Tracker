document.getElementById('add-expense-btn').addEventListener('click', addExpense);

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    if (name === '' || amount === '' || category === '' || date === '') {
        alert('Please fill in all fields');
        return;
    }

    const expenseTableBody = document.getElementById('expense-table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>$${parseFloat(amount).toFixed(2)}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>
            <button onclick="editExpense(this)">Edit</button>
            <button onclick="deleteExpense(this)">Delete</button>
        </td>
    `;

    expenseTableBody.appendChild(row);
    updateTotalAmount();
    clearForm();
}

function editExpense(button) {
    const row = button.parentElement.parentElement;
    const cells = row.children;

    document.getElementById('expense-name').value = cells[0].innerText;
    document.getElementById('expense-amount').value = cells[1].innerText.replace('$', '');
    document.getElementById('expense-category').value = cells[2].innerText;
    document.getElementById('expense-date').value = cells[3].innerText;

    row.remove();
    updateTotalAmount();
}

function deleteExpense(button) {
    button.parentElement.parentElement.remove();
    updateTotalAmount();
}

function updateTotalAmount() {
    const expenseTableBody = document.getElementById('expense-table-body');
    const rows = expenseTableBody.getElementsByTagName('tr');
    let totalAmount = 0;

    for (let row of rows) {
        const amount = parseFloat(row.children[1].innerText.replace('$', ''));
        totalAmount += amount;
    }

    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
}

function clearForm() {
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = 'Food';
    document.getElementById('expense-date').value = '';
}

document.getElementById('category-filter').addEventListener('change', filterByCategory);

function filterByCategory() {
    const category = document.getElementById('category-filter').value;
    const expenseTableBody = document.getElementById('expense-table-body');
    const rows = expenseTableBody.getElementsByTagName('tr');

    for (let row of rows) {
        if (category === 'All' || row.children[2].innerText === category) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}