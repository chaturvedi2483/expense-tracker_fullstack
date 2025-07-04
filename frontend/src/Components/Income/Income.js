import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome, setEditingItem } = useGlobalContext()

    useEffect(() => {
        getIncomes()
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
        <IncomeStyled>
            <InnerLayout>
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="gradient-text">Income Management</h1>
                        <p>Track and manage all your income sources</p>
                    </div>
                    <div className="total-display">
                        <div className="total-card">
                            <div className="total-icon">
                                <i className="fa-solid fa-arrow-trend-up"></i>
                            </div>
                            <div className="total-content">
                                <span className="total-label">Total Income</span>
                                <span className="total-amount">${totalIncome().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes-container">
                        <div className="section-header">
                            <h3>Recent Income</h3>
                            <span className="count-badge">{incomes.length} records</span>
                        </div>
                        <div className="incomes-list">
                            {incomes.length === 0 ? (
                                <div className="no-data">
                                    <div className="no-data-icon">
                                        <i className="fa-solid fa-chart-line"></i>
                                    </div>
                                    <h4>No Income Records</h4>
                                    <p>Start tracking your income by adding your first record!</p>
                                </div>
                            ) : (
                                incomes.map((income) => {
                                    const {_id, title, amount, date, category, description, type} = income;
                                    return <IncomeItem
                                        key={_id}
                                        id={_id} 
                                        title={title} 
                                        description={description} 
                                        amount={amount} 
                                        date={date} 
                                        type={type}
                                        category={category} 
                                        indicatorColor="var(--color-green)"
                                        deleteItem={deleteIncome}
                                        onEdit={handleEdit}
                                    />
                                })
                            )}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
        padding: 2rem;
        background: linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(104, 211, 145, 0.05));
        border-radius: var(--border-radius-xl);
        border: 1px solid rgba(72, 187, 120, 0.1);
        
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
                border: 1px solid rgba(72, 187, 120, 0.2);
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
                    background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
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
                        color: var(--color-green);
                    }
                }
            }
        }
    }
    
    .income-content {
        display: grid;
        grid-template-columns: 400px 1fr;
        gap: 2rem;
        align-items: start;
        
        .form-container {
            position: sticky;
            top: 2rem;
        }
        
        .incomes-container {
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
                    background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
            }
            
            .incomes-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
        
        .no-data {
            background: var(--background-card);
            border: 2px dashed rgba(72, 187, 120, 0.3);
            border-radius: var(--border-radius-xl);
            padding: 3rem 2rem;
            text-align: center;
            
            .no-data-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
                background: linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(104, 211, 145, 0.05));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                
                i {
                    font-size: 2rem;
                    color: var(--color-green);
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
        .income-content {
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

export default Income