import './App.css';
import styled from 'styled-components';
import { MainApp } from './MainApp';

function App() {
  return (
    <CalculatorContainer>
      <MainApp />
    </CalculatorContainer>
  );
}

export default App;

const CalculatorContainer = styled.div`
  background-color: #f2f2f2f2;
  height: 100vh;
`;
