var selectedRow = null;
    let url = "https://crudcrud.com/api/26ee7d73eb6c46d59907a169a396498c/candy-details";

    window.addEventListener('DOMContentLoaded', async () => {
      try {
        const res = await axios.get(url);
        for (let i = 0; i < res.data.length; i++) {
          insertNewRecord(res.data[i]);
        }
      } catch (err) {
        console.log(err);
      }
    });

    async function onFormSubmit(e) {
      e.preventDefault();
      var formData = readFormData();
      if (selectedRow == null) {
        try {
          const res = await axios.post(url, formData);
          insertNewRecord(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        await updateRecord(formData);
      }
      resetForm();
    }

    function readFormData() {
      var formData = {};
      formData["name"] = document.getElementById("name").value;
      formData["description"] = document.getElementById("description").value;
      formData["quantity"] = document.getElementById("quantity").value;
      formData["price"] = document.getElementById("price").value;
      return formData;
    }

    async function insertNewRecord(data) {
      var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
      var newRow = table.insertRow(table.length);
      cell1 = newRow.insertCell(0);
      cell1.innerHTML = data.name;
      cell2 = newRow.insertCell(1);
      cell2.innerHTML = data.description;
      cell3 = newRow.insertCell(2);
      cell3.innerHTML = data.quantity;
      cell4 = newRow.insertCell(3);
      cell4.innerHTML = data.price;
      cell5 = newRow.insertCell(4);
      cell5.innerHTML = `<button onClick="onBuy1(this,'`+data._id+`')">Buy1</button> <button onClick="onBuy2(this,'`+data._id+`')">Buy2</button> <button onClick="onBuy3(this,'`+data._id+`')">Buy3</button>`;
    }

    async function onBuy1(button,id) {
      var row = button.parentNode.parentNode;
      var quantityElement = row.cells[2];
      var quantity = parseInt(quantityElement.innerHTML);

      if (quantity > 0) {
        quantity--;
        quantityElement.innerHTML = quantity;
        var updatedformdata = {};
        updatedformdata["name"] = row.cells[0].innerHTML;
        updatedformdata["description"] = row.cells[1].innerHTML;
        updatedformdata["quantity"] = quantity;
        updatedformdata["price"] = row.cells[3].innerHTML;

        const res = await axios.put(url+'/'+id, updatedformdata);
        // Add any additional logic or API calls here to update the quantity in the backend
      } else {
        alert('No more candies available!');
      }
    }

    async function onBuy2(button,id) {
      var row = button.parentNode.parentNode;
      var quantityElement = row.cells[2];
      var quantity = parseInt(quantityElement.innerHTML);

      if (quantity >= 2) {
        quantity -= 2;
        quantityElement.innerHTML = quantity;
        var updatedformdata = {};
        updatedformdata["name"] = row.cells[0].innerHTML;
        updatedformdata["description"] = row.cells[1].innerHTML;
        updatedformdata["quantity"] = quantity;
        updatedformdata["price"] = row.cells[3].innerHTML;

        const res = await axios.put(url+'/'+id, updatedformdata);
        // Add any additional logic or API calls here to update the quantity in the backend
      } else {
        alert('Not enough candies available!');
      }
    }

    async function onBuy3(button,id) {
      var row = button.parentNode.parentNode;
      var quantityElement = row.cells[2];
      var quantity = parseInt(quantityElement.innerHTML);

      if (quantity >= 3) {
        quantity -= 3;
        quantityElement.innerHTML = quantity;

        var updatedformdata = {};
        updatedformdata["name"] = row.cells[0].innerHTML;
        updatedformdata["description"] = row.cells[1].innerHTML;
        updatedformdata["quantity"] = quantity;
        updatedformdata["price"] = row.cells[3].innerHTML;

        const res = await axios.put(url+'/'+id, updatedformdata);

        // Add any additional logic or API calls here to update the quantity in the backend
      } else {
        alert('Not enough candies available!');
      }
    }

    async function updateRecord(formData) {
      selectedRow.cells[0].innerHTML = formData.name;
      selectedRow.cells[1].innerHTML = formData.description;
      selectedRow.cells[2].innerHTML = formData.quantity;
      selectedRow.cells[3].innerHTML = formData.price;
    }

    function onDelete(td) {
      if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
      }
    }

    function resetForm() {
      document.getElementById("name").value = '';
      document.getElementById("description").value = '';
      document.getElementById("quantity").value = '';
      document.getElementById("price").value = '';
      selectedRow = null;
    }

    document.getElementById("candyForm").addEventListener("submit", onFormSubmit);