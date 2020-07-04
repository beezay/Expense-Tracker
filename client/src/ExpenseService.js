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

    //Create Expense
    static insertExpenses(expensename, expensedescrption, expenseamount, dateofexpense) {
        return axios.post(url, {
            expensename,
            expensedescrption,
            expenseamount,
            dateofexpense
        });
    }

    //Edit Expense
    static updateExpenses(id) {
        return axios.put(`${url}${id}`);
    }

    //Delete Expense
    static deleteExpenses(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ExpenseService;