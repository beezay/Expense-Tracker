<template>
  <div class="container">

  <h1>Filter By</h1>

    <div>
    
    <h1>Expenses</h1>
    <!----- Create Expense Here 
    <div class="add-expense">
      <label for="create-expense" class="label-edit">Add New Expense</label>
      <input type="text" id="create-expense" v-model="expensename" placeholder="Expense Name">
      <input type="text" id="create-expense" v-model="expensedescrption" placeholder="Expense Description">
      <input type="text" id="create-expense" v-model="expenseamount" placeholder="Expense Amount">
      <input type="date" id="create-expense" v-model="dateofexpense" placeholder="Expense Date">
      <button v-on:click="createExpense">Add</button>
    </div>
    --->
    <hr>
    <p class="error" v-if="error"> {{error}} </p>
    <div class="expenses-container">
      <!--
      <div class="expense"
        v-for="(expen, index) in expense"
        v-bind:item="expen"
        v-bind:index="index"
        v-bind:key="expen._id"
      >
         {{`${expen.createdAt.getDate()}/${expen.createdAt.getMonth()}/${expen.createdAt.getFullYear()}`}} 
        <p class="expensename"><strong class="higlighted">Expense Name</strong>: {{expen.expensename}} </p>
        <p class="expensename"><strong class="higlighted">Expense Description</strong>: {{expen.expensedescrption}} </p>
        <p class="expensename"><strong class="higlighted">Expense Amount</strong>: {{expen.expenseamount}} </p>
        <p class="expensename"><strong class="higlighted">Date</strong>: {{expen.dateofexpense}} </p>
        <router-link to="/update/:expen._id" class="link">Edit Expense</router-link>
        <button v-on:click="editExpense(expen._id)">Edit</button>
        <button v-on:click="deleteExpense(expen._id)">Delete</button>
        </div>
        -->
        <table cellspacing="0" class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th scope="col">Expense Name</th>
              <th scope="col">Expense Desc</th>
              <th scope="col">Expense Amount</th>
              <th scope="col">Date of Expense</th>             
            </tr>
          </thead>
          <tr 
            v-for="(expen, index) in expense"
            v-bind:item="expen"
            v-bind:index="index"
            v-bind:key="expen._id"
          >
          <td>{{expen.expensename}}</td>
          <td>{{expen.expensedescrption}}</td>
          <td>{{expen.expenseamount}}</td>
          <td>{{expen.dateofexpense}}</td>
          
          <td><button class="btn btn-primary"><router-link :to="{ name: 'UpdateExpense', params: { id: expen._id }}" class="link">Edit</router-link></button></td>
          <td><button v-on:click="deleteExpense(expen._id)" class="btn btn-primary">Delete</button></td>
          </tr>
        </table>
      
    </div>
    </div>

    <div class="total">
      <!-- <h1 class=" display-1 badge badge-info ">Total Expense</h1> -->
      <div class="display-4 badge-info">
        <p><strong>Total: {{ sumExpenseAmount }}</strong></p>
        
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseService from '../ExpenseService'; 

export default {
  name: 'ExpenseComponent',
  data() {
    return {
      expense: [],
      error: '',
      expensename: '',
      expensedescrption: '',
      expenseamount: '',
      dateofexpense: '',
      totalexpense: '',
      sumExpenseAmount: 0
    }
  },

  async created() {
    try {
      this.expense = await ExpenseService.getExpenses();
      const data = this.expense;
      // console.log('test', data)
      let sum = 0

      data.forEach(function (item) {
        if(!isNaN(item.expenseamount)){
          sum = sum + parseFloat(item.expenseamount)
        }
        
      });
      this.sumExpenseAmount = sum;
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async deleteExpense(id) {
      await ExpenseService.deleteExpenses(id);
      this.expense = await ExpenseService.getExpenses();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.expense{
  background-color: rgba(212, 240, 240, 0.829);
}
.higlighted{
  color: red;
}
.create-expense{
  display: flex;
}
.label-edit{
  font-weight: 200;
}
.link{
  text-decoration: none;
}
.container{
  display: flex;
  justify-content: space-evenly;
}
.total-block{
  background-color: azure;
}
/*****  TABLE CSS ***/
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.table .thead-light th {
  color: #495057;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.table-dark {
  color: #fff;
  background-color: #343a40;
}

/**LINK ALERT ***/
.alert-primary {
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
/**Button ***/
.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  color: #fff;
  background-color: #eb2e6d;
  border-color: #0062cc;
}
/***LINk */
.link{
  padding:2px;
  text-decoration: none;
  font-weight: 100;
  color:#fff;
}
/***BADGE*****/
.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.badge-info {
  color: #fff;
  background-color: #17a2b8;
}
/***DISPLAY ****/
.display-1 {
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.2;
}
.display-4 {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
}
</style>
