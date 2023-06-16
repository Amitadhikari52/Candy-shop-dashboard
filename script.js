var selectedRow = null;
let url = "https://crudcrud.com/api/24bd2b703c444dce8a2c902ac3fdd964/Order-details";

window.addEventListener('DOMContentLoaded', () => {
    axios.get(url)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                insertNewRecord(res.data[i]);
            }
        })
        .catch(err => {
            console.log(err);
        });
});

function onFormSubmit(e) {
    e.preventDefault();
    var formData = readFormData();
    if (selectedRow == null) {
        axios.post(url, formData)
            .then((res) => {
                insertNewRecord(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["productCode"] = document.getElementById("productCode").value;
    formData["product"] = document.getElementById("product").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["perPrice"] = document.getElementById("perPrice").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.productCode;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.product;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.perPrice;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick="onBuy1(this)">Buy1</button> <button onClick="onBuy2(this)">Buy2</button> <button onClick="onBuy3(this)">Buy3</button>`;
}

function onBuy1(button) {
    var row = button.parentNode.parentNode;
    var quantityElement = row.cells[2];
    var quantity = parseInt(quantityElement.innerHTML);

    if (quantity > 0) {
        quantity--;
        quantityElement.innerHTML = quantity;
    } else {
        alert('No more candies available!');
    }
}

function onBuy2(button) {
    var row = button.parentNode.parentNode;
    var quantityElement = row.cells[2];
    var quantity = parseInt(quantityElement.innerHTML);

    if (quantity >= 2) {
        quantity -= 2;
        quantityElement.innerHTML = quantity;
    } else {
        alert('Not enough candies available!');
    }
}

function onBuy3(button) {
    var row = button.parentNode.parentNode;
    var quantityElement = row.cells[2];
    var quantity = parseInt(quantityElement.innerHTML);

    if (quantity >= 3) {
        quantity -= 3;
        quantityElement.innerHTML = quantity;
    } else {
        alert('Not enough candies available!');
    }
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;
}

function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}

document.getElementById('resetBtn').addEventListener('click', resetForm);
