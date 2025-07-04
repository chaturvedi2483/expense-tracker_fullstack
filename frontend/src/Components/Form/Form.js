import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus, edit as editIcon } from '../../utils/Icons';

function Form() {
    const { addIncome, updateIncome, error, setError, editingItem, setEditingItem, loading } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    // Populate form when editing
    useEffect(() => {
        if (editingItem && editingItem.type === 'income') {
            setInputState({
                title: editingItem.title,
                amount: editingItem.amount,
                date: new Date(editingItem.date),
                category: editingItem.category,
                description: editingItem.description,
            })
        } else {
            // Clear form when not editing
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            })
        }
    }, [editingItem])

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = {
            ...inputState,
            amount: parseFloat(amount)
        }
        
        let result
        if (editingItem && editingItem.type === 'income') {
            result = await updateIncome(editingItem.id, formData)
        } else {
            result = await addIncome(formData)
        }
        
        if (result.success) {
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            })
        }
    }

    const handleCancel = () => {
        setEditingItem(null)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
        setError('')
    }

    const isEditing = editingItem && editingItem.type === 'income'

    return (
        <FormStyled onSubmit={handleSubmit} className="glass">
            <div className="form-header">
                <div className="form-icon">
                    <i className="fa-solid fa-plus-circle"></i>
                </div>
                <h3>{isEditing ? 'Update Income' : 'Add New Income'}</h3>
                <p>{isEditing ? 'Modify your income details' : 'Track your earnings and income sources'}</p>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-grid">
                <div className="input-group">
                    <label htmlFor="title">Income Title</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-tag input-icon"></i>
                        <input 
                            id="title"
                            type="text" 
                            value={title}
                            name={'title'} 
                            placeholder="e.g., Salary, Freelance Project"
                            onChange={handleInput('title')}
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="amount">Amount</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-dollar-sign input-icon"></i>
                        <input 
                            id="amount"
                            value={amount}  
                            type="number" 
                            name={'amount'} 
                            placeholder={'0.00'}
                            onChange={handleInput('amount')} 
                            required
                            min="0"
                            step="0.01"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="date">Date</label>
                    <div className="input-wrapper date-wrapper">
                        <i className="fa-solid fa-calendar input-icon"></i>
                        <DatePicker 
                            id='date'
                            placeholderText='Select Date'
                            selected={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                setInputState({...inputState, date: date})
                            }}
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="category">Category</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-list input-icon"></i>
                        <select 
                            id="category"
                            required 
                            value={category} 
                            name="category" 
                            onChange={handleInput('category')}
                            disabled={loading}
                        >
                            <option value="" disabled>Choose a category</option>
                            <option value="salary">💼 Salary</option>
                            <option value="freelancing">💻 Freelancing</option>
                            <option value="investments">📈 Investments</option>
                            <option value="stocks">📊 Stocks</option>
                            <option value="bitcoin">₿ Bitcoin</option>
                            <option value="bank">🏦 Bank Transfer</option>  
                            <option value="youtube">📺 Youtube</option>  
                            <option value="other">🔄 Other</option>  
                        </select>
                    </div>
                </div>

                <div className="input-group full-width">
                    <label htmlFor="description">Description</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-comment input-icon"></i>
                        <textarea 
                            id="description"
                            name="description" 
                            value={description} 
                            placeholder='Add a detailed description...' 
                            cols="30" 
                            rows="3" 
                            onChange={handleInput('description')}
                            required
                            disabled={loading}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <Button 
                    name={loading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Income' : 'Add Income')}
                    icon={isEditing ? editIcon : plus}
                    bPad={'1rem 2rem'}
                    bRad={'12px'}
                    variant={isEditing ? "primary" : "success"}
                    disabled={loading}
                    type="submit"
                />
                {isEditing && (
                    <Button 
                        name={'Cancel'}
                        bPad={'1rem 2rem'}
                        bRad={'12px'}
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={loading}
                        type="button"
                    />
                )}
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    background: var(--background-card);
    border: 1px solid rgba(102, 126, 234, 0.1);
    border-radius: var(--border-radius-xl);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-green), var(--color-green-light));
    }
    
    .form-header {
        text-align: center;
        margin-bottom: 2rem;
        
        .form-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 1rem;
            background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
            
            i {
                font-size: 1.5rem;
                color: white;
            }
        }
        
        h3 {
            color: var(--primary-color);
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        p {
            color: var(--primary-color3);
            font-size: 0.9rem;
            margin: 0;
        }
    }
    
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 2rem;
        
        .input-group {
            display: flex;
            flex-direction: column;
            
            &.full-width {
                grid-column: 1 / -1;
            }
            
            label {
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                
                .input-icon {
                    position: absolute;
                    left: 1rem;
                    color: var(--primary-color3);
                    font-size: 0.875rem;
                    z-index: 1;
                    transition: var(--transition);
                }
                
                &:focus-within .input-icon {
                    color: var(--color-accent);
                }
                
                &.date-wrapper {
                    .react-datepicker-wrapper {
                        width: 100%;
                    }
                }
            }
        }
    }
    
    input, textarea, select {
        font-family: inherit;
        font-size: 0.95rem;
        outline: none;
        border: 2px solid rgba(102, 126, 234, 0.1);
        padding: 1rem 1rem 1rem 3rem;
        border-radius: var(--border-radius-md);
        background: var(--background-secondary);
        color: var(--primary-color);
        transition: var(--transition);
        width: 100%;
        
        &::placeholder {
            color: var(--primary-color3);
        }
        
        &:focus {
            border-color: var(--color-accent);
            background: var(--background-card);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            transform: translateY(-1px);
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background: var(--color-grey-light);
        }
    }
    
    textarea {
        resize: vertical;
        min-height: 80px;
        line-height: 1.5;
    }
    
    select {
        cursor: pointer;
        
        option {
            padding: 0.5rem;
        }
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding-top: 1rem;
        border-top: 1px solid rgba(102, 126, 234, 0.1);
        
        button {
            min-width: 140px;
        }
    }
    
    .error {
        margin-bottom: 1.5rem;
        animation: slideInDown 0.3s ease-out;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        padding: 1.5rem;
        
        .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .form-actions {
            flex-direction: column;
            
            button {
                width: 100%;
            }
        }
    }
`;

export default Form