Vue.component('togglebutton', {
  props: ['label', 'name'],
  template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
      <label v-bind:for="name">
        <span class="togglebutton-label">{{ label }}</span>
        <span class="tooglebutton-box"></span>
      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
  </div>`,
     model: {
    prop: 'checked',
    event: 'change'
  },
  data: function() {
    return {
      isactive:false
    }
  },
  methods: {
    onToogle: function() {
       this.$emit('clicked', this.isactive)
    }
  }
});

var todolist = new Vue({
    el: '#todolist',
    data: {
        newitem: {
            label: '',
            description: ''
        },
        sortByStatus: false,
        todo: [
            { id: 1, label: "Task 1", description: "Description for Task 1", done: false },
            { id: 2, label: "Task 2", description: "Description for Task 2", done: false },
            { id: 3, label: "Task 3", description: "Description for Task 3", done: false }
        ]
    },
    methods: {
        addItem: function () {
            if (this.newitem.label.trim() !== '') {
                this.todo.push({ id: Math.floor(Math.random() * 9999) + 10, label: this.newitem.label, description: this.newitem.description, done: false });
                this.newitem.label = '';
                this.newitem.description = '';
            }
        },
      
        markAsDoneOrUndone: function (item) {
            item.done = !item.done;
                if (item.done) {
              moveTaskToDoneTable(item);
          }
        },
        deleteItemFromList: function (item) {
            let index = this.todo.indexOf(item);
            if (index !== -1) {
                this.todo.splice(index, 1);
            }
        },
        clickontoogle: function (active) {
            this.sortByStatus = active;
        }
    },
    computed: {
        todoByStatus: function () {
            if (!this.sortByStatus) {
                return this.todo;
            }

            var sortedArray = []
            var doneArray = this.todo.filter(function (item) { return item.done; });
            var notDoneArray = this.todo.filter(function (item) { return !item.done; });

            sortedArray = [...notDoneArray, ...doneArray];
            return sortedArray;
        }
    }
});
function moveTaskToDoneTable(item) {
    const doneTasksTableBody = document.getElementById('doneTasksTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.label}</td>
        <td>${item.description}</td>
        <td>Done</td>
    `;
    doneTasksTableBody.appendChild(row);
}

// Function to export table data to Excel
function exportTableToExcel() {
    const table = document.querySelector('table'); // Get the table
    const rows = table.querySelectorAll('tr'); // Get all rows
    const header = [];
    const data = [];

    // Extract header cells
    rows[0].querySelectorAll('th').forEach(headerCell => {
        header.push(headerCell.innerText);
    });

    // Extract table data
    for (let i = 1; i < rows.length; i++) {
        const rowData = [];
        rows[i].querySelectorAll('td').forEach(cell => {
            rowData.push(cell.innerText);
        });
        data.push(rowData);
    }

    // Create a CSV string with header and data
    const csvContent = "" +
        header.join(",") +
        "\n" +
        data.map(row => row.join(",")).join("\n");

    // Create a Blob and save it as a file
    const blob = new Blob([csvContent], { type: "data:text/csv;charset=utf-8" });
    saveAs(blob, "exported_data.csv");
}

// Attach the exportTableToExcel function to the button click event
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', exportTableToExcel);
