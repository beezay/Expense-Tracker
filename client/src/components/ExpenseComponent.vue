<template>
  <div class="container">
    <h1>Expenses</h1>
    <!----- Create Expense Here --->
    <div class="add-expense">
      <label for="create-expense" class="label-edit">Add New Expense</label>
      <input type="text" id="create-expense" v-model="expensename" placeholder="Expense Name">
      <input type="text" id="create-expense" v-model="expensedescrption" placeholder="Expense Description">
      <input type="text" id="create-expense" v-model="expenseamount" placeholder="Expense Amount">
      <input type="date" id="create-expense" v-model="dateofexpense" placeholder="Expense Date">
      <button v-on:click="createExpense">Add</button>
    </div>
    <hr>
    <p class="error" v-if="error"> {{error}} </p>
    <div class="expenses-container">
      <div class="expense"
        v-for="(expen, index) in expense"
        v-bind:item="expen"
        v-bind:index="index"
        v-bind:key="expen._id"
        v-on:dblclick="deleteExpense(expen._id)"
      >
        <!-- {{`${expen.createdAt.getDate()}/${expen.createdAt.getMonth()}/${expen.createdAt.getFullYear()}`}} -->
        <p class="expensename"><strong class="higlighted">Expense Name</strong>: {{expen.expensename}} </p>
        <p class="expensename"><strong class="higlighted">Expense Description</strong>: {{expen.expensedescrption}} </p>
        <p class="expensename"><strong class="higlighted">Expense Amount</strong>: {{expen.expenseamount}} </p>
        <p class="expensename"><strong class="higlighted">Date</strong>: {{expen.dateofexpense}} </p>
      </div>
    </div>
    <div class="total">
      <p><strong>Total Expenses</strong>:  </p>
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
      totalexpense: ''
    }
  },
  async created() {
    try {
      this.expense = await ExpenseService.getExpenses();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createExpense() {
      await ExpenseService.insertExpenses(
        this.expensename,
        this.expensedescrption,
        this.expenseamount,
        this.dateofexpense
      );
      this.expense = await ExpenseService.getExpenses();
    },
    async deleteExpense(id) {
      await ExpenseService.deleteExpenses(id);
      this.expense = await ExpenseService.getExpenses();
    },
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
</style>
