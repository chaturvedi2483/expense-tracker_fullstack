import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const balance = totalBalance()
    const isPositive = balance >= 0

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="dashboard-header">
                    <h1 className="gradient-text">Financial Overview</h1>
                    <p>Track your income and expenses with detailed insights</p>
                </div>
                
                <div className="stats-con">
                    <div className="chart-con">
                        <div className="chart-wrapper">
                            <Chart />
                        </div>
                        <div className="amount-con">
                            <div className="stat-card income-card hover-lift">
                                <div className="stat-icon income-icon">
                                    <i className="fa-solid fa-arrow-trend-up"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Total Income</h3>
                                    <p className="amount income-amount">
                                        {dollar} {totalIncome().toLocaleString()}
                                    </p>
                                    <span className="stat-label">This month</span>
                                </div>
                            </div>
                            
                            <div className="stat-card expense-card hover-lift">
                                <div className="stat-icon expense-icon">
                                    <i className="fa-solid fa-arrow-trend-down"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Total Expenses</h3>
                                    <p className="amount expense-amount">
                                        {dollar} {totalExpenses().toLocaleString()}
                                    </p>
                                    <span className="stat-label">This month</span>
                                </div>
                            </div>
                            
                            <div className={`stat-card balance-card hover-lift ${isPositive ? 'positive' : 'negative'}`}>
                                <div className={`stat-icon balance-icon ${isPositive ? 'positive' : 'negative'}`}>
                                    <i className={`fa-solid ${isPositive ? 'fa-wallet' : 'fa-exclamation-triangle'}`}></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Net Balance</h3>
                                    <p className={`amount balance-amount ${isPositive ? 'positive' : 'negative'}`}>
                                        {dollar} {Math.abs(balance).toLocaleString()}
                                    </p>
                                    <span className="stat-label">
                                        {isPositive ? 'Available balance' : 'Over budget'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="history-con">
                        <History />
                        <div className="insights-section">
                            <div className="insight-card hover-lift">
                                <h3>Income Range</h3>
                                <div className="range-display">
                                    <div className="range-item min">
                                        <span className="label">Minimum</span>
                                        <span className="value">
                                            ${incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)).toLocaleString() : '0'}
                                        </span>
                                    </div>
                                    <div className="range-divider"></div>
                                    <div className="range-item max">
                                        <span className="label">Maximum</span>
                                        <span className="value">
                                            ${incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)).toLocaleString() : '0'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="insight-card hover-lift">
                                <h3>Expense Range</h3>
                                <div className="range-display">
                                    <div className="range-item min">
                                        <span className="label">Minimum</span>
                                        <span className="value">
                                            ${expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)).toLocaleString() : '0'}
                                        </span>
                                    </div>
                                    <div className="range-divider"></div>
                                    <div className="range-item max">
                                        <span className="label">Maximum</span>
                                        <span className="value">
                                            ${expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)).toLocaleString() : '0'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .dashboard-header {
        text-align: center;
        margin-bottom: 3rem;
        
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
    
    .stats-con{
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        
        .chart-con{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            
            .chart-wrapper {
                background: var(--background-card);
                border: 1px solid rgba(102, 126, 234, 0.1);
                box-shadow: var(--shadow-lg);
                padding: 2rem;
                border-radius: var(--border-radius-xl);
                height: 400px;
                position: relative;
                overflow: hidden;
                
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
                }
            }
            
            .amount-con{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
                
                .stat-card {
                    background: var(--background-card);
                    border: 1px solid rgba(102, 126, 234, 0.1);
                    box-shadow: var(--shadow-md);
                    border-radius: var(--border-radius-lg);
                    padding: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 3px;
                        background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
                    }
                    
                    .stat-icon {
                        width: 50px;
                        height: 50px;
                        border-radius: var(--border-radius-md);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 1rem;
                        
                        i {
                            font-size: 1.5rem;
                            color: white;
                        }
                        
                        &.income-icon {
                            background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
                        }
                        
                        &.expense-icon {
                            background: linear-gradient(135deg, var(--color-delete), var(--color-delete-light));
                        }
                        
                        &.balance-icon {
                            &.positive {
                                background: linear-gradient(135deg, var(--color-info), #60A5FA);
                            }
                            
                            &.negative {
                                background: linear-gradient(135deg, var(--color-warning), #FBBF24);
                            }
                        }
                    }
                    
                    .stat-content {
                        h3 {
                            font-size: 0.875rem;
                            font-weight: 600;
                            color: var(--primary-color3);
                            margin-bottom: 0.5rem;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        
                        .amount {
                            font-size: 1.75rem;
                            font-weight: 700;
                            margin-bottom: 0.25rem;
                            
                            &.income-amount {
                                color: var(--color-green);
                            }
                            
                            &.expense-amount {
                                color: var(--color-delete);
                            }
                            
                            &.balance-amount {
                                &.positive {
                                    color: var(--color-info);
                                }
                                
                                &.negative {
                                    color: var(--color-warning);
                                }
                            }
                        }
                        
                        .stat-label {
                            font-size: 0.75rem;
                            color: var(--primary-color3);
                            font-weight: 500;
                        }
                    }
                }
            }
        }

        .history-con{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            
            .insights-section {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                
                .insight-card {
                    background: var(--background-card);
                    border: 1px solid rgba(102, 126, 234, 0.1);
                    box-shadow: var(--shadow-md);
                    padding: 1.5rem;
                    border-radius: var(--border-radius-lg);
                    
                    h3 {
                        font-size: 1rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        color: var(--primary-color);
                    }
                    
                    .range-display {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        
                        .range-item {
                            flex: 1;
                            text-align: center;
                            
                            .label {
                                display: block;
                                font-size: 0.75rem;
                                color: var(--primary-color3);
                                font-weight: 500;
                                text-transform: uppercase;
                                letter-spacing: 0.5px;
                                margin-bottom: 0.25rem;
                            }
                            
                            .value {
                                display: block;
                                font-size: 1.125rem;
                                font-weight: 700;
                                color: var(--primary-color);
                            }
                        }
                        
                        .range-divider {
                            width: 1px;
                            height: 30px;
                            background: linear-gradient(to bottom, transparent, var(--color-grey), transparent);
                        }
                    }
                }
            }
        }
    }
    
    @media (max-width: 1200px) {
        .stats-con {
            grid-template-columns: 1fr;
            
            .chart-con .amount-con {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
        }
    }
    
    @media (max-width: 768px) {
        .dashboard-header h1 {
            font-size: 2rem;
        }
        
        .chart-con .amount-con {
            grid-template-columns: 1fr;
        }
    }
`;

export default Dashboard