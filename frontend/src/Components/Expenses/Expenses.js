import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses, setEditingItem } = useGlobalContext()

    useEffect(() => {
        getExpenses()
    }, [])

    const handleEdit = (item) => {
        setEditingItem(item)
        // Scroll to form when editing
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    return (
        <ExpenseStyled>
            <InnerLayout>
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="gradient-text">Expense Management</h1>
                        <p>Track and control your spending habits</p>
                    </div>
                    <div className="total-display">
                        <div className="total-card">
                            <div className="total-icon">
                                <i className="fa-solid fa-arrow-trend-down"></i>
                            </div>
                            <div className="total-content">
                                <span className="total-label">Total Expenses</span>
                                <span className="total-amount">${totalExpenses().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses-container">
                        <div className="section-header">
                            <h3>Recent Expenses</h3>
                            <span className="count-badge">{expenses.length} records</span>
                        </div>
                        <div className="expenses-list">
                            {expenses.length === 0 ? (
                                <div className="no-data">
                                    <div className="no-data-icon">
                                        <i className="fa-solid fa-receipt"></i>
                                    </div>
                                    <h4>No Expense Records</h4>
                                    <p>Start tracking your expenses by adding your first record!</p>
                                </div>
                            ) : (
                                expenses.map((expense) => {
                                    const {_id, title, amount, date, category, description, type} = expense;
                                    return <IncomeItem
                                        key={_id}
                                        id={_id} 
                                        title={title} 
                                        description={description} 
                                        amount={amount} 
                                        date={date} 
                                        type={type}
                                        category={category} 
                                        indicatorColor="var(--color-delete)"
                                        deleteItem={deleteExpense}
                                        onEdit={handleEdit}
                                    />
                                })
                            )}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
        padding: 2rem;
        background: linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(252, 129, 129, 0.05));
        border-radius: var(--border-radius-xl);
        border: 1px solid rgba(245, 101, 101, 0.1);
        
        .header-content {
            h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }
            
            p {
                color: var(--primary-color3);
                font-size: 1.1rem;
                margin: 0;
            }
        }
        
        .total-display {
            .total-card {
                background: var(--background-card);
                border: 1px solid rgba(245, 101, 101, 0.2);
                border-radius: var(--border-radius-lg);
                padding: 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                box-shadow: var(--shadow-md);
                min-width: 200px;
                
                .total-icon {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, var(--color-delete), var(--color-delete-light));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    i {
                        font-size: 1.25rem;
                        color: white;
                    }
                }
                
                .total-content {
                    display: flex;
                    flex-direction: column;
                    
                    .total-label {
                        font-size: 0.875rem;
                        color: var(--primary-color3);
                        font-weight: 500;
                        margin-bottom: 0.25rem;
                    }
                    
                    .total-amount {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--color-delete);
                    }
                }
            }
        }
    }
    
    .expense-content {
        display: grid;
        grid-template-columns: 400px 1fr;
        gap: 2rem;
        align-items: start;
        
        .form-container {
            position: sticky;
            top: 2rem;
        }
        
        .expenses-container {
            .section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                
                h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin: 0;
                }
                
                .count-badge {
                    background: linear-gradient(135deg, var(--color-delete), var(--color-delete-light));
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
            }
            
            .expenses-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
        
        .no-data {
            background: var(--background-card);
            border: 2px dashed rgba(245, 101, 101, 0.3);
            border-radius: var(--border-radius-xl);
            padding: 3rem 2rem;
            text-align: center;
            
            .no-data-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
                background: linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(252, 129, 129, 0.05));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                
                i {
                    font-size: 2rem;
                    color: var(--color-delete);
                }
            }
            
            h4 {
                color: var(--primary-color);
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            
            p {
                color: var(--primary-color3);
                font-size: 1rem;
                margin: 0;
            }
        }
    }
    
    @media (max-width: 1200px) {
        .expense-content {
            grid-template-columns: 1fr;
            
            .form-container {
                position: static;
            }
        }
    }
    
    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
            
            .header-content h1 {
                font-size: 2rem;
            }
        }
    }
`;

export default Expenses