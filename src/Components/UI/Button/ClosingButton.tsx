import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
  transition: transform 0.4s;
  &:hover {
    transform: rotate(180deg);
  }
`;
const XWrapper = styled.div`
  position: relative;
`;

const X = styled.div`
  position: relative;
  &:after {
    content: '\\00d7';
    color: ${({ theme }) => theme.colors.white};
    font-size: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface ClosingButtonProps {
  handleClick: () => void;
}

const ClosingButton: React.FC<ClosingButtonProps> = ({ handleClick }) => {
  return (
    <Button onClick={() => handleClick()}>
      <XWrapper>
        {/* <Xline1 />
        <Xline2 /> */}
        <X />
      </XWrapper>
    </Button>
  );
};
export default ClosingButton;
