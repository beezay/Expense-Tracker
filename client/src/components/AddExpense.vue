<template>
<div>
    <h1>Add Expense Form Here!!!!!</h1>
    <div class="add-expense">
      <h3 class="add-heading">Add New Expense Here</h3>
      <form @submit.prevent="createExpense" method="POST">
      <input type="text" id="create-expense" class="input" v-model="expensename" placeholder="Expense Name" required>
      <input type="text" id="create-expense"  class="input" v-model="expensedescrption" placeholder="Expense Description">
      <input type="text" id="create-expense" class="input" v-model="expenseamount" placeholder="Expense Amount" required>
      <input type="date" id="create-expense" class="input" v-model="dateofexpense" placeholder="Expense Date" required>
      <button type="submit" class="button">Add</button>
      </form>
    </div>
    <!--/** 
    <form @submit.prevent="saveContact" method="POST" >
        <div class="field">
            <label class="label">First Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="First Name" v-model="firstname" required>
            </div>
        </div>
        <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="Last Name" v-model="lastname" required>
            </div>
        </div>
        <div class="field">
            <label class="label">Email Address</label>
            <div class="control">
                <input class="input" type="email" placeholder="Email Address" v-model="emailaddress" required>
            </div>
        </div>
        <div class="field">
            <label class="label">Phone Number</label>
            <div class="control">
                <input class="input" type="text" placeholder="Phone Number" v-model="phonenumber" required>
            </div>
        </div>
        <div class="field">

            <div class="control">
                <button type="submit" class="button is-link">Submit</button>
                    
            </div>
        </div>
        </form>
        <a href="/"><button  class="button span is-link">Back</button></a> 

    ***/ -->   
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
        "expensedescription": this.expensedescrption,
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
</style>