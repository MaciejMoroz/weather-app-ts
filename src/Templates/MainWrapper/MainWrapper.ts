import styled from 'styled-components';

export const MainWrapper = styled.section`
    overflow: hidden;
    padding: 10px;
    position: relative;
    background: ${({ theme }) => theme.gradient.primary};
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.text};
    @media screen and (min-width: 992px) {
        padding: 30px;
  }

    @media screen and (min-width: 1200px) {
      max-width: 1160px;
      padding: 0 auto;
  }
`