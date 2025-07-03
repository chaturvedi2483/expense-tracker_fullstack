import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/"

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Set up axios defaults
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    // Auth functions
    const register = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${BASE_URL}register`, userData)
            setLoading(false)
            return { 
                success: true, 
                userId: response.data.userId,
                message: response.data.message 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
            setLoading(false)
            return { success: false }
        }
    }

    const verifyOTP = async (otpData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${BASE_URL}verify-otp`, otpData)
            const { token, user } = response.data
            
            localStorage.setItem('token', token)
            setToken(token)
            setUser(user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            setLoading(false)
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed')
            setLoading(false)
            return { success: false }
        }
    }

    const resendOTP = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            await axios.post(`${BASE_URL}resend-otp`, userData)
            setLoading(false)
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP')
            setLoading(false)
            return { success: false }
        }
    }

    const login = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${BASE_URL}login`, userData)
            
            if (response.data.needsVerification) {
                setLoading(false)
                return { 
                    success: false, 
                    needsVerification: true,
                    userId: response.data.userId 
                }
            }
            
            const { token, user } = response.data
            localStorage.setItem('token', token)
            setToken(token)
            setUser(user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            setLoading(false)
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
            setLoading(false)
            return { success: false }
        }
    }

    const forgotPassword = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${BASE_URL}forgot-password`, userData)
            setLoading(false)
            return { 
                success: true, 
                userId: response.data.userId 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset OTP')
            setLoading(false)
            return { success: false }
        }
    }

    const resetPassword = async (resetData) => {
        setLoading(true)
        setError(null)
        try {
            await axios.post(`${BASE_URL}reset-password`, resetData)
            setLoading(false)
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Password reset failed')
            setLoading(false)
            return { success: false }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIncomes([])
        setExpenses([])
        delete axios.defaults.headers.common['Authorization']
    }

    // Income functions
    const addIncome = async (income) => {
        setError(null)
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income)
            await getIncomes()
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add income')
            return { success: false }
        }
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`)
            setIncomes(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch incomes')
        }
    }

    const updateIncome = async (id, incomeData) => {
        setError(null)
        try {
            await axios.put(`${BASE_URL}update-income/${id}`, incomeData)
            await getIncomes()
            setEditingItem(null)
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update income')
            return { success: false }
        }
    }

    const deleteIncome = async (id) => {
        setError(null)
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`)
            await getIncomes()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete income')
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
        setError(null)
        try {
            await axios.post(`${BASE_URL}add-expense`, expense)
            await getExpenses()
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add expense')
            return { success: false }
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch expenses')
        }
    }

    const updateExpense = async (id, expenseData) => {
        setError(null)
        try {
            await axios.put(`${BASE_URL}update-expense/${id}`, expenseData)
            await getExpenses()
            setEditingItem(null)
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update expense')
            return { success: false }
        }
    }

    const deleteExpense = async (id) => {
        setError(null)
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`)
            await getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete expense')
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
            register,
            verifyOTP,
            resendOTP,
            login,
            forgotPassword,
            resetPassword,
            logout,
            user,
            token,
            
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
            loading,
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