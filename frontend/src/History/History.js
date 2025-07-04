import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../utils/dateFormat';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <div className="history-header">
                <h3>Recent Activity</h3>
                <span className="activity-count">{history.length} transactions</span>
            </div>
            
            <div className="history-list">
                {history.length === 0 ? (
                    <div className="no-history">
                        <div className="no-history-icon">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                        </div>
                        <p>No recent transactions</p>
                    </div>
                ) : (
                    history.map((item) => {
                        const {_id, title, amount, type, date} = item
                        return (
                            <div key={_id} className="history-item hover-lift">
                                <div className="transaction-info">
                                    <div className="transaction-icon">
                                        <i className={`fa-solid ${type === 'expense' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                                    </div>
                                    <div className="transaction-details">
                                        <h5 className="transaction-title">{title}</h5>
                                        <span className="transaction-date">{dateFormat(date)}</span>
                                    </div>
                                </div>
                                
                                <div className="transaction-amount">
                                    <span className={`amount ${type}`}>
                                        {type === 'expense' ? '-' : '+'}${amount <= 0 ? 0 : amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    background: var(--background-card);
    border: 1px solid rgba(102, 126, 234, 0.1);
    border-radius: var(--border-radius-xl);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    
    .history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        
        h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--primary-color);
            margin: 0;
        }
        
        .activity-count {
            background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }
    }
    
    .history-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        
        .no-history {
            text-align: center;
            padding: 2rem 1rem;
            
            .no-history-icon {
                width: 50px;
                height: 50px;
                margin: 0 auto 1rem;
                background: rgba(102, 126, 234, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                
                i {
                    font-size: 1.25rem;
                    color: var(--color-accent);
                }
            }
            
            p {
                color: var(--primary-color3);
                font-size: 0.9rem;
                margin: 0;
            }
        }
        
        .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--background-secondary);
            border: 1px solid rgba(102, 126, 234, 0.05);
            border-radius: var(--border-radius-md);
            transition: var(--transition);
            
            &:hover {
                background: var(--background-card);
                border-color: rgba(102, 126, 234, 0.1);
                transform: translateX(4px);
            }
            
            .transaction-info {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                
                .transaction-icon {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    i {
                        font-size: 0.875rem;
                        color: white;
                    }
                }
                
                .transaction-details {
                    .transaction-title {
                        font-size: 0.9rem;
                        font-weight: 600;
                        color: var(--primary-color);
                        margin: 0 0 0.25rem 0;
                        max-width: 120px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    
                    .transaction-date {
                        font-size: 0.75rem;
                        color: var(--primary-color3);
                        font-weight: 500;
                    }
                }
            }
            
            .transaction-amount {
                .amount {
                    font-size: 0.9rem;
                    font-weight: 700;
                    
                    &.income {
                        color: var(--color-green);
                        
                        ~ .transaction-info .transaction-icon {
                            background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
                        }
                    }
                    
                    &.expense {
                        color: var(--color-delete);
                        
                        ~ .transaction-info .transaction-icon {
                            background: linear-gradient(135deg, var(--color-delete), var(--color-delete-light));
                        }
                    }
                }
            }
        }
        
        /* Apply icon background based on transaction type */
        .history-item:has(.amount.income) .transaction-icon {
            background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
        }
        
        .history-item:has(.amount.expense) .transaction-icon {
            background: linear-gradient(135deg, var(--color-delete), var(--color-delete-light));
        }
    }
`;

export default History