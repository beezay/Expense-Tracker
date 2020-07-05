import axios from 'axios';

const url = 'api/expense/';
class ExpenseService {
    //GET Expense
    static getExpenses(date) {
      
      return  new Promise((resolve, reject) => {
        axios.get(url + '?date=' + date).then((res) => {
            const data = res.data;
            resolve(
                data.map(expense => ({
                    ...expense,
                    createdAt: new Date(expense.createdAt)
                }))
            );
        })
        .catch((err)=> {
            reject(err);
        })
        
    });
    }

    //GET Expense
    static getExpense(id) {
      
        return new Promise((resolve, reject) => {
          axios.get(`${url}${id}`).then((res) => {
            const data = res.data;
            resolve(
                data
            );
          })
          .catch((err)=> {
            reject(err);
          })
          
      });
      }

    //Create Expense
    static insertExpense(data) {
        return axios.post(url, data);
    }

    //Edit Expense
    static updateExpense(id, expensename, expensedescrption, expenseamount, dateofexpense) {
        // console.log('test', id)
        return axios.post(`${url}${id}`, {
            expensename,
            expensedescrption,
            expenseamount,
            dateofexpense
        });
    }

    //Delete Expense
    static deleteExpense(id) {
        console.log('Deleted', id)
        return axios.delete(`${url}${id}`);
    }
}

export default ExpenseService;