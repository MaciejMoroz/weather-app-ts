import styled from 'styled-components/macro';

export const Container = styled.div`
  /* overflow: hidden; */
  position: relative;
  @media screen and (min-width: 992px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1160px;
    margin: 0 auto;
  }
`;
