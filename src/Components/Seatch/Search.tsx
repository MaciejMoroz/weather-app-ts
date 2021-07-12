import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { ReactComponent as SearchIcon } from 'assets/search.svg';
import { ReactComponent as GPSIcon } from 'assets/gps.svg';
import API from 'Helpers/API';
import { ICity } from 'App';
import ClosingButton from 'Components/UI/Button/ClosingButton';
import CitiList from 'Components/CityList/CityList';

interface IButtonProps {
  showInput: boolean | null;
}

interface ISearchProps {
  setSowInpt: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<ICity>>;
  showInput: boolean;
  handleShowInput: (value: boolean) => void;
  handleShowGeoList: (value: boolean) => void;
  showGeoList: boolean;
}

interface ISearchBoxFormProps {
  showInput: boolean;
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const SearchBoxForm = styled.div<ISearchBoxFormProps>`
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

const Button = styled.button<IButtonProps>`
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

const useOutsideClick = (
  // TODO jaki typ dla referencji
  ref: any,
  showInput: boolean,
  handleClose: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showInput && ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, showInput]);
};

const Search: React.FC<ISearchProps> = ({
  showInput,
  inputValue,
  setCurrentCity,
  handleShowInput,
  showGeoList,
  handleShowGeoList,
}) => {
  const [value, setValue] = useState<string>(inputValue);
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    handleShowInput(false);
    handleShowGeoList(false);
  };

  useOutsideClick(wrapperRef, showInput, handleClose);
  useOutsideClick(wrapperRef, showGeoList, handleClose);

  const handleSetCityFromList = (city: ICity) => {
    setCurrentCity(city);
    handleShowInput(false);
    handleShowGeoList(false);
  };

  useEffect(() => {
    if (showInput && inputRef && inputRef.current !== null) {
      inputRef.current.select();
    }
  }, [showInput]);

  useEffect(() => {
    setErrorMsg(null);
    setShowList(true);
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      API.getCityByName<ICity[]>(value)
        .then((response) => {
          if (response.length === 0) {
            throw { message: `City ${value} not found` };
          } else {
            setCityList(response);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setCityList([]);
          setIsLoading(false);
          setErrorMsg(error.message);
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  const handleSetUserGeo = () => {
    setIsLoading(true);
    setCityList([]);
    handleShowGeoList(true);

    navigator.geolocation.getCurrentPosition((position) => {
      API.getCityByGeo<ICity[]>(
        position.coords.latitude,
        position.coords.longitude
      )
        .then((response) => {
          if (response.length === 0) {
            throw { message: `City ${value} not found` };
          } else {
            setCityList(response);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setCityList([]);
          setIsLoading(false);
          setErrorMsg(error.message);
        });
    });
  };

  return (
    <Wrapper ref={wrapperRef}>
      <SearchBoxForm showInput={showInput}>
        <StyledInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
        />
        <ClosingButton handleClick={handleClose} />
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
      {showList && showInput && (
        <CitiList
          errorMsg={errorMsg}
          isLoading={isLoading}
          cityList={cityList}
          handleSetCityFromList={handleSetCityFromList}
        />
      )}
      {showList && showGeoList && (
        <CitiList
          errorMsg={errorMsg}
          isLoading={isLoading}
          cityList={cityList}
          handleSetCityFromList={handleSetCityFromList}
          showGeoList={showGeoList}
        />
      )}
    </Wrapper>
  );
};
export default Search;
