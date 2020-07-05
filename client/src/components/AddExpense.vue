<template>
<div>
    <div class="add-expense">
      <h3 class="add-heading">Add New Expense Here</h3>
     <form @submit.prevent="createExpense" method="POST" class="form-inline">
   
        <div class="form-group">
            <input type="text" id="create-expense" class="form-control" v-model="expensename" placeholder="Expense Name" required>
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
        <button type="submit" class="btn btn-success">Add</button>
      </form>
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
  methods: {
    async createExpense() {
        const data= {
        "expensename": this.expensename,
        "expensedescrption": this.expensedescrption,
        "expenseamount": this.expenseamount,
        "dateofexpense": this.dateofexpense
        }
      await ExpenseService.insertExpenses(data)
        .then(function () {
            
           window.location.href = "/"
        }
        )
  }
}
}
</script>

<style scoped>
input #create-expense{
    margin: 10px;
    padding: 10px;
}
.add-heading{
    color:blue;
}
.input{
    margin: 20px;
    border: 2px solid rgb(82, 3, 3);
    height: 30px;
    text-align: center;
}
.button{
    text-align: center;
    font-size: 30px;
    align-content: center;
    margin-top:10px;
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
.form-control-plaintext {
  display: block;
  width: 100%;
  padding: 0.375rem 0;
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  background-color: transparent;
  border: solid transparent;
  border-width: 1px 0;
}
/***BUTTON ******/
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
.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  color: #fff;
  background-color: #218838;
  border-color: #1e7e34;
}
</style>