<template>
<div>
    
    <h1>Update or Delete the Expense Here</h1>
    <form @submit.prevent="editExpense" method="POST" class="form-inline">
      <div class="form-group">
        <input type="text" id="create-expense" class="form-control"  v-model="expensename" placeholder="Expense Name" required>
      </div>
      <div class="form-group">
        <input type="text" id="create-expense"  class="form-control" v-model="expensedescrption" placeholder="Expense Description">
      </div>
      <div class="form-group">
        <input type="text" id="create-expense" class="form-control" v-model="expenseamount" placeholder="Expense Amount" required>
      </div>
      <div class="form-group">
        <input type="date" id="create-expense" class="form-control" v-model="dateofexpense" placeholder="Expense Date" required>
      </div>
      <button type="submit" class="btn btn-info">Update</button>
    </form>
    <br>
    <div class="container">
        <table cellspacing="0" class="table table-bordered">
            <th scope="col">Expense Name</th>
            <th scope="col">Expense Desc</th>
            <th scope="col">Expense Amount</th>
            <th scope="col">Date of Expense</th> 
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
          <td><button v-on:click="deleteExpense(expen._id)" class="btn btn-danger">Delete</button></td>
          </tr>
        </table>
    </div>

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
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
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
.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
.btn-info {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  color: #fff;
  background-color: #138496;
  border-color: #117a8b;
}
/**FORM****/
.form-inline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
}
.form-group {
  margin-bottom: 1rem;
}
.form-inline .form-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 0;
  }
  .form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>