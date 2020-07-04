<template>
<div>
    
    <h1>Update or Delete the Expense Here</h1>
    <form @submit.prevent="editExpense" method="POST">
      <input type="text" id="create-expense" class="input"  v-model="expensename" placeholder="Expense Name" required>
      <input type="text" id="create-expense"  class="input" v-model="expensedescrption" placeholder="Expense Description">
      <input type="text" id="create-expense" class="input" v-model="expenseamount" placeholder="Expense Amount" required>
      <input type="date" id="create-expense" class="input" v-model="dateofexpense" placeholder="Expense Date" required>
      <button type="submit" class="button">Update</button>
    </form>
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
          <td><button v-on:click="deleteExpense(expen._id)">Delete</button></td>
          </tr>
        </table>
</div>

</template>

<script>
    import ExpenseService from '../ExpenseService'; 

export default {
        name: 'AddExpense',
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
      this.expense = await ExpenseService.getExpense(this.$route.params.id);
      const data = this.expense;
      this.expensename = data["0"].expensename ? data["0"].expensename : '';
      this.expensedescrption = data["0"].expensedescrption ? data["0"].expensedescrption : '';
      this.expenseamount = data["0"].expenseamount ? data["0"].expenseamount : '';
      this.dateofexpense = data["0"].dateofexpense ? data["0"].dateofexpense : '';
      console.log("fdaf", this.expense,data, "jgjg", data["0"].expensename)
    } catch (err) {
      console.log("eerr", err);
      this.error = err.message;
    }
  },
  methods:{
      async editExpense() {
      //   console.log('Edit',this.$route.params.id)
      // await ExpenseService.updateExpenses(this.$route.params.id);
      // this.expense = await ExpenseService.getExpenses();
      await ExpenseService.updateExpenses(
        this.$route.params.id,
        this.expensename,
        this.expensedescrption,
        this.expenseamount,
        this.dateofexpense
      )
        .then(function () {
            
           window.location.href = "/"
        }
        )
    }
  }

}
</script>

<style scoped>

</style>