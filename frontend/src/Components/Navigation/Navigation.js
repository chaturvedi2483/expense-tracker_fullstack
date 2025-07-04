import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'

function Navigation({active, setActive}) {
    
    return (
        <NavStyled className="glass">
            <div className="user-con">
                <div className="avatar-container">
                    <img src={avatar} alt="User Avatar" />
                    <div className="status-indicator"></div>
                </div>
                <div className="text">
                    <h2 className="gradient-text">ExpenseTracker</h2>
                    <p>Smart Money Management</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={`menu-item ${active === item.id ? 'active': ''}`}
                    >
                        <div className="icon-container">
                            {item.icon}
                        </div>
                        <span>{item.title}</span>
                        {active === item.id && <div className="active-indicator"></div>}
                    </li>
                })}
            </ul>
            <div className="nav-footer">
                <div className="version-info">
                    <span>Version 2.0</span>
                </div>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 320px;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius-xl);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-shadow: var(--shadow-xl);
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    }
    
    .user-con{
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border-radius: var(--border-radius-lg);
        border: 1px solid rgba(102, 126, 234, 0.1);
        
        .avatar-container {
            position: relative;
            
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid var(--color-accent);
                box-shadow: var(--shadow-md);
                transition: var(--transition);
                
                &:hover {
                    transform: scale(1.05);
                    box-shadow: var(--shadow-lg);
                }
            }
            
            .status-indicator {
                position: absolute;
                bottom: 2px;
                right: 2px;
                width: 12px;
                height: 12px;
                background: var(--color-green);
                border: 2px solid white;
                border-radius: 50%;
                box-shadow: var(--shadow-sm);
            }
        }
        
        .text {
            h2{
                font-size: 1.25rem;
                font-weight: 700;
                margin-bottom: 0.25rem;
            }
            
            p{
                color: var(--primary-color3);
                font-size: 0.875rem;
                font-weight: 500;
                margin: 0;
            }
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        
        .menu-item{
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.25rem;
            font-weight: 500;
            cursor: pointer;
            border-radius: var(--border-radius-lg);
            color: var(--primary-color2);
            position: relative;
            transition: var(--transition);
            
            &:hover{
                background: rgba(102, 126, 234, 0.08);
                color: var(--primary-color);
                transform: translateX(4px);
                
                .icon-container {
                    background: var(--color-accent);
                    color: white;
                    transform: scale(1.1);
                }
            }
            
            .icon-container {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--border-radius-md);
                background: rgba(102, 126, 234, 0.1);
                transition: var(--transition);
                
                i{
                    font-size: 1.125rem;
                    color: var(--color-accent);
                    transition: var(--transition);
                }
            }
            
            span {
                font-size: 0.95rem;
                font-weight: 600;
            }
            
            .active-indicator {
                position: absolute;
                right: 1rem;
                width: 6px;
                height: 6px;
                background: var(--color-accent);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--color-accent);
            }
        }
        
        .active{
            background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
            color: white;
            box-shadow: var(--shadow-md);
            transform: translateX(4px);
            
            .icon-container {
                background: rgba(255, 255, 255, 0.2);
                
                i{
                    color: white;
                }
            }
            
            &:hover {
                transform: translateX(6px);
                box-shadow: var(--shadow-lg);
            }
        }
    }
    
    .nav-footer {
        padding: 1rem;
        text-align: center;
        border-top: 1px solid rgba(102, 126, 234, 0.1);
        
        .version-info {
            span {
                font-size: 0.75rem;
                color: var(--primary-color3);
                font-weight: 500;
            }
        }
    }
`;

export default Navigation