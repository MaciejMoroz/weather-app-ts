import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/search.svg';
import { ReactComponent as GPSIcon } from 'assets/gps.svg';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
`;
interface ButtonProps {
  showInput: boolean | null;
}
const Button = styled.button<ButtonProps>`
  display: block;
  ${({ showInput }) =>
    showInput &&
    css`
      display: none;
    `}
`;

const Icon = styled.div`
  svg {
    width: 26px;
    height: 26px;
    margin-left: 16px;
    @media screen and (min-width: 768px) {
      width: 36px;
      height: 36px;
    }
    @media screen and (min-width: 992px) {
      width: 52px;
      height: 52px;
    }
  }
  .st0,
  & {
    fill: #ffff;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  transition: all 0.4s;
  border-bottom: 1px solid #ffff;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fs.h6};
  @media screen and (min-width: 360px) {
    font-size: ${({ theme }) => theme.fs.h5};
  }
  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fs.h4};
  }
  @media screen and (min-width: 992px) {
    font-size: ${({ theme }) => theme.fs.h3};
  }
`;

interface SearchBoxFormProps {
  showInput: boolean;
}
const SearchBoxForm = styled.form<SearchBoxFormProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  display: ${({ showInput }) => (showInput ? 'flex' : 'none')};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
`;

interface SearchProps {
  showInput: boolean;
  setSowInpt: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
  handleShowInput: any;
  handleSetUserGeo: () => void;
}

const Search: React.FC<SearchProps> = ({
  showInput,
  setSowInpt,
  inputValue,
  setCurrentCity,
  handleShowInput,
  handleSetUserGeo
}) => {
  const [value, setValue] = useState(inputValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setCurrentCity(value);
    handleShowInput(false);
  };

  useEffect(() => {
    if (showInput && inputRef && inputRef.current !== null) {
      inputRef.current.select();
    }
  }, [showInput]);

  return (
    <Wrapper>
      <SearchBoxForm onSubmit={(e) => handleSearch(e)} showInput={showInput}>
        <StyledInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => handleShowInput(false)}
          ref={inputRef}
        />
        <Button type="submit" showInput={null}>
          <Icon>
            <SearchIcon />
          </Icon>
        </Button>
      </SearchBoxForm>
      <ButtonWrapper>
        <Button onClick={() => handleSetUserGeo()} showInput={showInput}>
          <Icon>
            <GPSIcon />
          </Icon>
        </Button>
        <Button onClick={() => handleShowInput(true)} showInput={showInput}>
          <Icon>
            <SearchIcon />
          </Icon>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default Search;
