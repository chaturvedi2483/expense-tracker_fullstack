import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    // Set up axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Check if user is logged in on app start
    useEffect(() => {
        if (token) {
            getProfile();
        }
    }, [token]);

    // Auth functions
    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}auth/register`, userData);
            const { token: newToken, user: newUser } = response.data;
            
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(newUser);
            setError(null);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}auth/login`, credentials);
            const { token: newToken, user: newUser } = response.data;
            
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(newUser);
            setError(null);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIncomes([]);
        setExpenses([]);
        setError(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const getProfile = async () => {
        try {
            const response = await axios.get(`${BASE_URL}auth/profile`);
            setUser(response.data);
        } catch (err) {
            console.error('Failed to get profile:', err);
            logout();
        }
    };

    // Income functions
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add income');
        }
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (error) {
            setError('Failed to fetch incomes');
        }
    }

    const updateIncome = async (id, incomeData) => {
        try {
            const response = await axios.put(`${BASE_URL}update-income/${id}`, incomeData);
            getIncomes();
            setError(null);
            setEditingItem(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update income');
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError('Failed to delete income');
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
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add expense');
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (error) {
            setError('Failed to fetch expenses');
        }
    }

    const updateExpense = async (id, expenseData) => {
        try {
            const response = await axios.put(`${BASE_URL}update-expense/${id}`, expenseData);
            getExpenses();
            setError(null);
            setEditingItem(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update expense');
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError('Failed to delete expense');
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
            // Auth
            user,
            token,
            loading,
            register,
            login,
            logout,
            
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