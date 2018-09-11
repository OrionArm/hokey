import { injectGlobal } from 'styled-components';

export const theme = {
  topHeaderColor: '#4f5467',
  secondColor: '#03a9f3',
  shadowBlock:
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2),' +
    '0px 2px 2px 0px rgba(0, 0, 0, 0.14),' +
    '0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  btnShadow:
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2),' +
    '0px 2px 2px 0px rgba(0, 0, 0, 0.14),' +
    '0px 3px 1px -2px rgba(0, 0, 0, 0.1)',
  btnShadowHover:
    '0px 5px 5px 0px rgba(0, 0, 0, 0.2),' +
    '0px 2px 2px 0px rgba(0, 0, 0, 0.14),' +
    '0px 3px 1px -2px rgba(0, 0, 0, 0.1)',
};

injectGlobal`
  @import url(‘https://fonts.googleapis.com/css?family=Montserrat|Roboto');

  body {
    margin: 0;
    font-family: Roboto, sans-serif;
    background-color: #EDF1F5;
    color: #000000;
    font-size: 16px;
  }
  button {
    color: inherit;
    cursor: pointer;
    margin: 0;
    border: 0;
    display: inline-flex;
    padding: 0;
    outline: none;
    position: relative;
    user-select: none;
    align-items: center;
    border-radius: 0;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
}
    }
`;
