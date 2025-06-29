const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.post('/add-income', auth, addIncome)
    .get('/get-incomes', auth, getIncomes)
    .put('/update-income/:id', auth, updateIncome)
    .delete('/delete-income/:id', auth, deleteIncome)
    .post('/add-expense', auth, addExpense)
    .get('/get-expenses', auth, getExpense)
    .put('/update-expense/:id', auth, updateExpense)
    .delete('/delete-expense/:id', auth, deleteExpense);

module.exports = router;