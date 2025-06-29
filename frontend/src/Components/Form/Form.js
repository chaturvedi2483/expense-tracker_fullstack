import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus, edit as editIcon } from '../../utils/Icons';

function Form() {
    const { addIncome, updateIncome, error, setError, editingItem, setEditingItem } = useGlobalContext()
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

    const handleSubmit = e => {
        e.preventDefault()
        
        const formData = {
            ...inputState,
            amount: parseFloat(amount)
        }
        
        if (editingItem && editingItem.type === 'income') {
            updateIncome(editingItem.id, formData)
        } else {
            addIncome(formData)
        }
        
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
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
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            }
            <div className="form-header">
                <h3>{isEditing ? 'Update Income' : 'Add New Income'}</h3>
            </div>
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Income Title"
                    onChange={handleInput('title')}
                    required
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="number" 
                    name={'amount'} 
                    placeholder={'Income Amount'}
                    onChange={handleInput('amount')} 
                    required
                    min="0"
                    step="0.01"
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Select Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                    required
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Add Description' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                    required
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={isEditing ? 'Update Income' : 'Add Income'}
                    icon={isEditing ? editIcon : plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
                {isEditing && (
                    <Button 
                        name={'Cancel'}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-grey)'}
                        color={'#fff'}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
    .form-header {
        text-align: center;
        margin-bottom: 1rem;
        
        h3 {
            color: var(--primary-color);
            font-size: 1.5rem;
            font-weight: 600;
        }
    }
    
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .8rem 1rem;
        border-radius: 8px;
        border: 2px solid #e1e1e1;
        background: #fff;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        transition: border-color 0.3s ease;
        
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
        
        &:focus {
            border-color: var(--color-accent);
            box-shadow: 0px 1px 15px rgba(245, 102, 146, 0.2);
        }
    }
    
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            width: 100%;
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        display: flex;
        gap: 1rem;
        justify-content: center;
        
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            
            &:hover{
                background: var(--color-green) !important;
                transform: translateY(-2px);
            }
        }
    }
`;

export default Form