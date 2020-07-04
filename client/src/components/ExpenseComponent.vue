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
        <table cellspacing="0">
          <th>Expense Name</th>
          <th>Expense Desc</th>
          <th>Expense Amount</th>
          <th>Date of Expense</th>
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
          
          <td><router-link :to="{ name: 'UpdateExpense', params: { id: expen._id }}">Edit</router-link></td>
          <td><button v-on:click="deleteExpense(expen._id)">Delete</button></td>
          </tr>
        </table>
      
    </div>
    </div>

    <div class="total">
      <h1>Total Expense</h1>
      <div class="total-block">
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
      console.log('test', data)
      let sum = 0

      data.forEach(function (item) {
        if(!isNaN(item.expenseamount)){
          sum = sum + parseFloat(item.expenseamount)
        }
        
      });
      this.sumExpenseAmount = sum;
      // console.log("test", this.expense, sum, this.sumExpenseAmount);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
  /** 
   *     async createExpense() {
      await ExpenseService.insertExpenses(
        this.expensename,
        this.expensedescrption,
        this.expenseamount,
        this.dateofexpense
      );
      this.expense = await ExpenseService.getExpenses();
    },
  */
    async deleteExpense(id) {
      console.log('Delete', id)
      await ExpenseService.deleteExpenses(id);
      this.expense = await ExpenseService.getExpenses();
    },
    async editExpense(id) {
      console.log('Edit', id)
      await ExpenseService.updateExpenses(id);
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
</style>
