import styled from 'styled-components';

export const CityList = styled.div`
  background: ${({ theme }) => theme.colors.white};
  color: #000;
  z-index: 100;
  height: 100%;
  position: relative;
  padding: ${({ theme }) => theme.space.base};
`;
