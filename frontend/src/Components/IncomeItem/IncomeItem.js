import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, edit, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type,
    onEdit
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return money
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return circle
        }
    }

    const handleEdit = () => {
        onEdit({
            id,
            title,
            amount,
            date,
            category,
            description,
            type
        })
    }

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteItem(id)
        }
    }

    const getCategoryEmoji = () => {
        if (type === 'expense') {
            switch (category) {
                case 'education': return '📚';
                case 'groceries': return '🛒';
                case 'health': return '🏥';
                case 'subscriptions': return '📱';
                case 'takeaways': return '🍕';
                case 'clothing': return '👕';
                case 'travelling': return '✈️';
                default: return '🔄';
            }
        } else {
            switch (category) {
                case 'salary': return '💼';
                case 'freelancing': return '💻';
                case 'investments': return '📈';
                case 'stocks': return '📊';
                case 'bitcoin': return '₿';
                case 'bank': return '🏦';
                case 'youtube': return '📺';
                default: return '🔄';
            }
        }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor} className="hover-lift">
            <div className="item-header">
                <div className="icon-section">
                    <div className="category-icon">
                        <span className="emoji">{getCategoryEmoji()}</span>
                    </div>
                    <div className="item-info">
                        <h4 className="item-title">{title}</h4>
                        <span className="item-category">{category}</span>
                    </div>
                </div>
                <div className="amount-section">
                    <span className={`amount ${type}`}>
                        {type === 'expense' ? '-' : '+'}{dollar} {amount.toFixed(2)}
                    </span>
                </div>
            </div>
            
            <div className="item-content">
                <div className="item-details">
                    <div className="detail-item">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>{dateFormat(date)}</span>
                    </div>
                    <div className="detail-item description">
                        <i className="fa-solid fa-comment-dots"></i>
                        <span>{description}</span>
                    </div>
                </div>
                
                <div className="item-actions">
                    <Button 
                        icon={edit}
                        bPad={'0.75rem'}
                        bRad={'10px'}
                        variant="secondary"
                        onClick={handleEdit}
                        title="Edit"
                    />
                    <Button 
                        icon={trash}
                        bPad={'0.75rem'}
                        bRad={'10px'}
                        variant="danger"
                        onClick={handleDelete}
                        title="Delete"
                    />
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: var(--background-card);
    border: 1px solid rgba(102, 126, 234, 0.1);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: ${props => props.indicator};
    }
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        border-color: rgba(102, 126, 234, 0.2);
    }
    
    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        
        .icon-section {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .category-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05));
                border-radius: var(--border-radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(102, 126, 234, 0.1);
                
                .emoji {
                    font-size: 1.5rem;
                }
            }
            
            .item-info {
                .item-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin: 0 0 0.25rem 0;
                }
                
                .item-category {
                    font-size: 0.875rem;
                    color: var(--primary-color3);
                    font-weight: 500;
                    text-transform: capitalize;
                    background: rgba(102, 126, 234, 0.1);
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                }
            }
        }
        
        .amount-section {
            .amount {
                font-size: 1.25rem;
                font-weight: 700;
                padding: 0.5rem 1rem;
                border-radius: var(--border-radius-md);
                
                &.income {
                    color: var(--color-green);
                    background: rgba(72, 187, 120, 0.1);
                }
                
                &.expense {
                    color: var(--color-delete);
                    background: rgba(245, 101, 101, 0.1);
                }
            }
        }
    }
    
    .item-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        
        .item-details {
            flex: 1;
            
            .detail-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
                color: var(--primary-color2);
                font-size: 0.875rem;
                
                &:last-child {
                    margin-bottom: 0;
                }
                
                i {
                    color: var(--primary-color3);
                    width: 16px;
                    font-size: 0.75rem;
                }
                
                &.description {
                    span {
                        max-width: 300px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        
        .item-actions {
            display: flex;
            gap: 0.5rem;
            
            button {
                min-width: 40px;
                height: 40px;
                
                .btn-text {
                    display: none;
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        padding: 1rem;
        
        .item-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            
            .amount-section {
                align-self: flex-end;
            }
        }
        
        .item-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            
            .item-actions {
                align-self: flex-end;
            }
        }
    }
`;

export default IncomeItem