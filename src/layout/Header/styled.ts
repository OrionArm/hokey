import styled from 'styled-components';

export const HeaderWrapper = styled.header``;

export const HeaderTop = styled.div`
  background-color: ${props => props.theme.topHeaderColor};
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

export const HeaderBottom = styled.div`
  background-color: white;
  padding: 0 25px;
  height: 70px;
  display: flex;
  align-items: center;
`;
