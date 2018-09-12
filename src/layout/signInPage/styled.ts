import styled from 'styled-components';

export const FormLogin = styled.form`
  padding: 30px;
  width: 400px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 200px auto 0;
  box-shadow: ${props => props.theme.shadowBlock};
}
`;

export const Caption = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #e9ecef;
  padding: 10px;
  margin-bottom: 20px;
  color: rgba(52, 58, 64, 0.7);
  transition: 0.7s;

  &:hover,
  &:focus {
    outline: none;
    border-color: black;

    &:active {
      border-color: #e9ecef;
    }
  }
`;
export const BtnLogin = styled.button`
  background-color: ${props => props.theme.secondColor};
  border-radius: 40px;
  font-size: 18px;
  line-height: 18px;
  height: 55px;
  box-shadow: ${props => props.theme.btnShadow};
  transition: 0.7s;
  margin-top: 15px;

  &:hover,
  &:focus {
    outline: none;
    background: rgba(3, 169, 243, 0.8);
    box-shadow: ${props => props.theme.btnShadowHover};
  }
  &:active {
    box-shadow: ${props => props.theme.btnShadow};
    background-color: ${props => props.theme.secondColor};
  }
`;
