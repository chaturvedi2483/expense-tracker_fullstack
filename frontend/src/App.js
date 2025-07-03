import React, { useState, useMemo, useEffect } from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import AuthWrapper from './Components/Auth/AuthWrapper';
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1)
  const { token, user, logout } = useGlobalContext()

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  // If user is not authenticated, show auth wrapper
  if (!token || !user) {
    return <AuthWrapper />
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} user={user} onLogout={logout} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;