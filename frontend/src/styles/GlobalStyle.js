import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #2D3748;
        --primary-color2: #4A5568;
        --primary-color3: #718096;
        --color-green: #48BB78;
        --color-green-light: #68D391;
        --color-green-dark: #38A169;
        --color-grey: #A0AEC0;
        --color-grey-light: #F7FAFC;
        --color-grey-dark: #718096;
        --color-accent: #667EEA;
        --color-accent-light: #7C3AED;
        --color-accent-dark: #553C9A;
        --color-delete: #F56565;
        --color-delete-light: #FC8181;
        --color-warning: #ED8936;
        --color-info: #4299E1;
        --background-primary: #FFFFFF;
        --background-secondary: #F8FAFC;
        --background-card: #FFFFFF;
        --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --border-radius-sm: 6px;
        --border-radius-md: 12px;
        --border-radius-lg: 16px;
        --border-radius-xl: 24px;
        --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body{
        font-family: 'Inter', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: var(--primary-color2);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
        font-weight: 600;
        line-height: 1.3;
        margin-bottom: 0.5rem;
    }

    h1 { font-size: 2.5rem; font-weight: 700; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.125rem; }
    h6 { font-size: 1rem; }

    p {
        margin-bottom: 1rem;
        color: var(--primary-color2);
    }

    .error{
        color: var(--color-delete);
        background: rgba(245, 101, 101, 0.1);
        border: 1px solid rgba(245, 101, 101, 0.2);
        padding: 0.75rem 1rem;
        border-radius: var(--border-radius-md);
        font-weight: 500;
        animation: shake 0.5s ease-in-out;
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    }

    .success {
        color: var(--color-green-dark);
        background: rgba(72, 187, 120, 0.1);
        border: 1px solid rgba(72, 187, 120, 0.2);
        padding: 0.75rem 1rem;
        border-radius: var(--border-radius-md);
        font-weight: 500;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--color-grey-light);
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
        border-radius: 10px;
        transition: var(--transition);
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, var(--color-accent-dark), var(--color-accent));
    }
    
    /* Smooth transitions for all elements */
    * {
        transition: var(--transition);
    }
    
    /* Focus styles for accessibility */
    button:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    /* Loading animation */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .loading {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Fade in animation */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
        animation: fadeIn 0.6s ease-out;
    }

    /* Hover effects */
    .hover-lift {
        transition: var(--transition);
    }

    .hover-lift:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    /* Glass morphism effect */
    .glass {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    /* Gradient text */
    .gradient-text {
        background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;