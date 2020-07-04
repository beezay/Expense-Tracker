import axios from 'axios';

const url = 'http://localhost:5000/';

class ExpenseService {
    //GET Expense
    static getExpenses() {
      
      return  new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
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
    static insertExpenses(data) {
        return axios.post(url, data);
    }

    //Edit Expense
    static updateExpenses(id, expensename, expensedescrption, expenseamount, dateofexpense) {
        console.log('test', id)
        return axios.post(`${url}${id}`, {
            expensename,
            expensedescrption,
            expenseamount,
            dateofexpense
        });
    }

    //Delete Expense
    static deleteExpenses(id) {
        console.log('Deleted', id)
        return axios.delete(`${url}${id}`);
    }
}

export default ExpenseService;