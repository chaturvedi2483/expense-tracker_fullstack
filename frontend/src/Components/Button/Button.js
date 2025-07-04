import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad, disabled, type = "button", title, variant = "primary"}) {
    return (
        <ButtonStyled 
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
            }} 
            onClick={onClick}
            disabled={disabled}
            type={type}
            title={title}
            className={`btn-${variant} ${disabled ? 'disabled' : ''}`}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{name}</span>
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 600;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        
        &::before {
            left: 100%;
        }
    }
    
    &:active:not(:disabled) {
        transform: translateY(0);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
    
    .btn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        
        i {
            font-size: 1rem;
        }
    }
    
    .btn-text {
        white-space: nowrap;
    }
    
    &.btn-primary {
        background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
        color: white;
        border: 1px solid transparent;
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, var(--color-accent-dark), var(--color-accent));
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
    }
    
    &.btn-secondary {
        background: var(--background-card);
        color: var(--primary-color);
        border: 1px solid rgba(102, 126, 234, 0.2);
        
        &:hover:not(:disabled) {
            background: rgba(102, 126, 234, 0.05);
            border-color: var(--color-accent);
        }
    }
    
    &.btn-success {
        background: linear-gradient(135deg, var(--color-green), var(--color-green-light));
        color: white;
        border: 1px solid transparent;
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, var(--color-green-dark), var(--color-green));
            box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3);
        }
    }
    
    &.btn-danger {
        background: linear-gradient(135deg, var(--color-delete), var(--color-delete-light));
        color: white;
        border: 1px solid transparent;
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #E53E3E, var(--color-delete));
            box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3);
        }
    }
    
    &.btn-icon-only {
        width: 40px;
        height: 40px;
        padding: 0;
        border-radius: 50%;
        
        .btn-text {
            display: none;
        }
    }
`;

export default Button