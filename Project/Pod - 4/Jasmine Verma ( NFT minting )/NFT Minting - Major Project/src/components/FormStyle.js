import styled from 'styled-components';


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 20px;
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  width: 220px;
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px #4CAF50;
  }

  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3E8E41;
  }

  &:active {
    background-color: #3E8E41;
    transform: scale(0.95);
  }
`;
