import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'

function Login({ switchToRegister }) {
    const { login, error, loading } = useGlobalContext()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await login(formData)
        if (result.success) {
            setFormData({ email: '', password: '' })
        }
    }

    return (
        <LoginStyled>
            <div className="auth-container">
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
                
                {error && <div className="error">{error}</div>}
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="input-control">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <Button
                        name={loading ? 'Signing In...' : 'Sign In'}
                        bPad={'1rem 2rem'}
                        bRad={'10px'}
                        bg={'var(--color-accent)'}
                        color={'#fff'}
                        disabled={loading}
                    />
                </form>
                
                <p className="switch-auth">
                    Don't have an account?{' '}
                    <span onClick={switchToRegister}>Sign Up</span>
                </p>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    .auth-container {
        background: rgba(255, 255, 255, 0.95);
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        width: 100%;
        max-width: 400px;
        text-align: center;
        
        h2 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
            font-size: 2rem;
        }
        
        p {
            color: var(--primary-color2);
            margin-bottom: 2rem;
        }
        
        form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .input-control input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e1e1e1;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            
            &:focus {
                outline: none;
                border-color: var(--color-accent);
            }
        }
        
        button {
            width: 100%;
            justify-content: center;
            font-weight: 600;
            transition: all 0.3s ease;
            
            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }
            
            &:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none;
            }
        }
        
        .switch-auth {
            margin-top: 2rem;
            color: var(--primary-color);
            
            span {
                color: var(--color-accent);
                cursor: pointer;
                font-weight: 600;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        
        .error {
            background: #fee;
            color: #c33;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            border: 1px solid #fcc;
        }
    }
`

export default Login