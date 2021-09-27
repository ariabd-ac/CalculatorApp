import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const MainApp = () => {
  const [values, setValues] = useState({
    firstNumber: false,
    secondNumber: false,
    thirdNumber: false,
  });
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(0);
  const [showModalError, setShowModalError] = useState(false);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCount = () => {
    const valuesToArray = Object.values(values);

    let res = 0;
    if (operator !== '+') res = valuesToArray[0] || 0;
    valuesToArray.map((value, i) => {
      const numberValue = Number(value);
      switch (operator) {
        case '-':
          if (i !== 0 && numberValue !== 0) res = res - numberValue;
          break;
        case '*':
          if (i !== 0 && numberValue !== 0) res = res * numberValue;
          break;
        case '/':
          if (i !== 0 && numberValue !== 0) res = res / numberValue;
          break;
        default:
          res = res + numberValue;
          break;
      }
    });
    setResult(res);
  };

  const handleOnclickCheck = (param) => {
    if (param === 1) {
      setChecked1(!checked1);
      setValues({ ...values, firstNumber: false });
    }
    if (param === 2) {
      setChecked2(!checked2);
      setValues({ ...values, secondNumber: false });
    }
    if (param === 3) {
      setChecked3(!checked3);
      setValues({ ...values, thirdNumber: false });
    }
  };

  const validate = () => {
    const listDisabled = [checked1, checked2, checked3];
    const countDisabled = listDisabled.filter((v) => v === false);
    if (countDisabled.length === 1) setShowModalError(true);
    else setShowModalError(false);
  };

  useEffect(() => {
    if (values !== null) handleCount();
  }, [values, operator]);

  useEffect(() => {
    validate();
  }, [checked1, checked2, checked3]);

  return (
    <Container>
      <Header>
        <h3>Calculator App</h3>
      </Header>
      {showModalError && (
        <ContainerErrorMsg>
          {/* <div> */}
          <h2>Ooopssss...</h2>
          <p>Minimum input 2, please ceklist!</p>
          <button onClick={() => setShowModalError(false)}>Close Msg</button>
          {/* </div> */}
        </ContainerErrorMsg>
      )}
      <Content>
        <WraperInput>
          <InputGroup>
            <InputNumber
              type='number'
              onKeyUp={checked1 ? () => {} : handleChange}
              disabled={checked1}
              name='firstNumber'></InputNumber>
            <input
              type='checkbox'
              onClick={() => handleOnclickCheck(1)}></input>
          </InputGroup>
          <InputGroup>
            <InputNumber
              type='number'
              onKeyUp={checked2 ? () => {} : handleChange}
              disabled={checked2}
              name='secondNumber'></InputNumber>
            <input
              type='checkbox'
              onClick={() => handleOnclickCheck(2)}></input>
          </InputGroup>
          <InputGroup>
            <InputNumber
              type='number'
              onKeyUp={checked3 ? () => {} : handleChange}
              disabled={checked3}
              name='thirdNumber'></InputNumber>
            <input
              type='checkbox'
              onClick={() => handleOnclickCheck(3)}></input>
          </InputGroup>
        </WraperInput>
        <WrapperAction>
          <Action>
            <Oprator
              type='radio'
              name='operator'
              onClick={() => setOperator('+')}
              defaultChecked={operator === '+'}></Oprator>
            <label>+</label>
          </Action>
          <Action>
            <Oprator
              type='radio'
              name='operator'
              onClick={() => setOperator('-')}
              defaultChecked={operator === '-'}></Oprator>
            <label>-</label>
          </Action>
          <Action>
            <Oprator
              type='radio'
              name='operator'
              onClick={() => setOperator('*')}
              defaultChecked={operator === '*'}></Oprator>
            <label>X</label>
          </Action>
          <Action>
            <Oprator
              type='radio'
              name='operator'
              onClick={() => setOperator('/')}
              defaultChecked={operator === '/'}></Oprator>
            <label>/</label>
          </Action>
        </WrapperAction>
      </Content>
      <Footer>
        <hr />

        <Hasil>
          <h3>Hasil: </h3> <h3>{result}</h3>
        </Hasil>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  /* box-sizing: border-box; */
  box-shadow: 2px 2px 40px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
  display: flex;
  background-color: red;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding-left: 50px;
  padding-right: 50px;
  height: 50vh;
  margin-top: 1vh;
  /* align-items: center; */
`;

const WraperInput = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: green; */
  align-items: center;
  height: 30vh;
`;

const InputGroup = styled.div`
  /* background-color: saddlebrown; */
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  width: 100%;
  align-items: center;
  /* flex: 1; */
`;

const InputNumber = styled.input`
  border: 0.5px solid lightgray;
  box-sizing: border-box;
  border-radius: 6px;
  width: 80%;
  height: 43px;
  padding-left: 21px;
  padding-right: 21px;

  outline: none;

  &:focus {
    outline: none;
    border-color: #2b99ff;
  }
`;

const WrapperAction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: orange; */
  width: 100%;
  height: 10vh;
`;

const Action = styled.div`
  /* padding: 10px 10px 10px 10px; */
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff3f32;
  border-radius: 20px;
  margin-top: 10px;

  label {
    font-size: 24px;
  }
`;

const Oprator = styled.input`
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
  height: 25px;
  width: 25px;
  cursor: pointer;
  &:checked ~ label {
    /* background-color: lightseagreen; */
    border: 0px solid lightseagreen;
    color: white;
    border-radius: 10px;
  }
`;

const Footer = styled.div`
  hr {
    height: 5px;
  }
`;

const Hasil = styled.div`
  display: flex;
  /* background-color: red; */
  align-items: center;
  margin-top: 2vh;

  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
`;

const ContainerErrorMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: red;
    font-weight: bold;
  }

  button {
    padding: 10px 16px;
    border: none;
    outline: none;
    background-color: #ff3f32;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      opacity: 0.5;
    }
  }
`;
