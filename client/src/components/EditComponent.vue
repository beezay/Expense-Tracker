<template>
    <div>
        <div class="expenses-container">
        <div class="expense"
            v-for="(expen, index) in expense"
            v-bind:item="expen"
            v-bind:index="index"
            v-bind:key="expen._id"
            >
            <!-- {{`${expen.createdAt.getDate()}/${expen.createdAt.getMonth()}/${expen.createdAt.getFullYear()}`}} -->
            <p class="expensename"><strong class="higlighted">Expense Name</strong>: {{expen.expensename}} </p>
            <p class="expensename"><strong class="higlighted">Expense Description</strong>: {{expen.expensedescrption}} </p>
            <p class="expensename"><strong class="higlighted">Expense Amount</strong>: {{expen.expenseamount}} </p>
            <p class="expensename"><strong class="higlighted">Date</strong>: {{expen.dateofexpense}} </p>
            <button>Edit</button>
            <button v-on:click="deleteExpense(expen._id)">Delete</button>
         </div>
    </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>