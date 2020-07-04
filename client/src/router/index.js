import Vue from 'vue';
import Router from 'vue-router';
import ExpenseComponent from '@/components/ExpenseComponent';
import AddExpense from '@/components/AddExpense';
import UpdateExpense from '@/components/UpdateExpense';

Vue.use(Router)

export default new Router({
    routes : [
        {
            path: '/',
            name: 'Expense',
            component: ExpenseComponent
        },
        {
            path: '/add',
            name: 'AddExpense',
            component: AddExpense
        },
        {
            path: '/update',
            name: 'UpdateExpense',
            component: UpdateExpense
        }
    ],
    mode: 'history' 
})