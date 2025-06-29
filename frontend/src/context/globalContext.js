import React, { useContext, useState } from "react"

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [editingItem, setEditingItem] = useState(null)

    // Mock data functions (no backend calls)
    const addIncome = async (income) => {
        try {
            const newIncome = {
                _id: Date.now().toString(),
                ...income,
                type: 'income',
                createdAt: new Date()
            }
            setIncomes(prev => [newIncome, ...prev])
            setError(null)
            return { success: true }
        } catch (err) {
            setError('Failed to add income')
            return { success: false }
        }
    }

    const getIncomes = async () => {
        // Mock function - data is already in state
        return incomes
    }

    const updateIncome = async (id, incomeData) => {
        try {
            setIncomes(prev => prev.map(income => 
                income._id === id 
                    ? { ...income, ...incomeData, updatedAt: new Date() }
                    : income
            ))
            setError(null)
            setEditingItem(null)
            return { success: true }
        } catch (err) {
            setError('Failed to update income')
            return { success: false }
        }
    }

    const deleteIncome = async (id) => {
        try {
            setIncomes(prev => prev.filter(income => income._id !== id))
            setError(null)
        } catch (err) {
            setError('Failed to delete income')
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    // Expense functions
    const addExpense = async (expense) => {
        try {
            const newExpense = {
                _id: Date.now().toString(),
                ...expense,
                type: 'expense',
                createdAt: new Date()
            }
            setExpenses(prev => [newExpense, ...prev])
            setError(null)
            return { success: true }
        } catch (err) {
            setError('Failed to add expense')
            return { success: false }
        }
    }

    const getExpenses = async () => {
        // Mock function - data is already in state
        return expenses
    }

    const updateExpense = async (id, expenseData) => {
        try {
            setExpenses(prev => prev.map(expense => 
                expense._id === id 
                    ? { ...expense, ...expenseData, updatedAt: new Date() }
                    : expense
            ))
            setError(null)
            setEditingItem(null)
            return { success: true }
        } catch (err) {
            setError('Failed to update expense')
            return { success: false }
        }
    }

    const deleteExpense = async (id) => {
        try {
            setExpenses(prev => prev.filter(expense => expense._id !== id))
            setError(null)
        } catch (err) {
            setError('Failed to delete expense')
        }
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            // Income
            addIncome,
            getIncomes,
            incomes,
            updateIncome,
            deleteIncome,
            totalIncome,
            
            // Expense
            expenses,
            addExpense,
            getExpenses,
            updateExpense,
            deleteExpense,
            totalExpenses,
            
            // General
            totalBalance,
            transactionHistory,
            error,
            setError,
            editingItem,
            setEditingItem
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}