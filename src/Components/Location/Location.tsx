import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { DateToString } from 'Helpers/DateToString';

import { Heading1, Heading2, Heading3 } from 'Components/UI/Text/Heading';
import { Paragraph } from 'Components/UI/Text/Paragraph';
import Search from 'Components/UI/Button/Search';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

interface TextWrapperProps {
  showInput: boolean;
}

const TextWrapper = styled.div<TextWrapperProps>`
  /* white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden; */
  width: 75%;

  cursor: pointer;
  ${({ showInput }) =>
    showInput &&
    css`
      opacity: 0;
    `}
`;

const GPSLocation = styled.div``;

interface LocationProps {
  currentCity: string;
  countryIso2: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
}

const Location: React.FC<LocationProps> = ({
  currentCity,
  setCurrentCity,
  countryIso2
}) => {
  const [showInput, setSowInpt] = useState(false);
  const [userGeo, setUserGeo] = useState<{
    lat: null | number;
    long: null | number;
  }>({ lat: null, long: null });
  const handleShowInput = (value: boolean) => {
    setSowInpt(value);
  };

  const handleSetUserGeo = () => {
    // setUserGeo()
    navigator.geolocation.getCurrentPosition((position) => {
      setUserGeo({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    });
  };

  return (
    <Wrapper>
      {console.log(userGeo)}
      <TextWrapper onClick={() => handleShowInput(true)} showInput={showInput}>
        <Heading3 elipsis={true}>
          {currentCity}, {countryIso2}
        </Heading3>
        <Paragraph>{DateToString(new Date())}</Paragraph>
      </TextWrapper>
      <Search
        showInput={showInput}
        setSowInpt={setSowInpt}
        inputValue={currentCity}
        setCurrentCity={setCurrentCity}
        handleShowInput={handleShowInput}
        handleSetUserGeo={handleSetUserGeo}
      />
    </Wrapper>
  );
};

export default Location;
