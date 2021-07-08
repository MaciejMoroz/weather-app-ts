import styled from 'styled-components/macro';

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fs.base};
  @media screen and (min-width: 360px) {
    font-size: ${({ theme }) => theme.fs.sm};
  }
  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fs.md};
  }
`;
