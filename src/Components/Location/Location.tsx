import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { DateToString } from 'Helpers/DateToString';

import { Heading3 } from 'Components/UI/Text/Heading';
import { Paragraph } from 'Components/UI/Text/Paragraph';
import Search from 'Components/Seatch/Search';
import { ICity } from 'App';
import API from 'Helpers/API';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

interface ITextWrapperProps {
  showInput: boolean;
}

const TextWrapper = styled.div<ITextWrapperProps>`
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

interface ILocationProps {
  currentCity: ICity;
  setCurrentCity: React.Dispatch<React.SetStateAction<ICity>>;
}

const Location: React.FC<ILocationProps> = ({
  currentCity,
  setCurrentCity,
}) => {
  const [showInput, setSowInpt] = useState(false);
  const [showGeoList, setShowGeoList] = useState<boolean>(false);

  const handleShowInput = (value: boolean) => {
    setSowInpt(value);
    setShowGeoList(false);
  };
  const handleShowGeoList = (value: boolean) => {
    setShowGeoList(value);
    setSowInpt(false);
  };

  return (
    <Wrapper>
      <TextWrapper onClick={() => handleShowInput(true)} showInput={showInput}>
        <Heading3 elipsis={true}>
          {/* {currentCity.name}, {currentCity.country} */}
          {currentCity.name}
          {currentCity.country !== '' ? `, ${currentCity.country}` : null}
        </Heading3>
        <Paragraph>{DateToString(new Date())}</Paragraph>
      </TextWrapper>
      <Search
        showInput={showInput}
        handleShowInput={handleShowInput}
        setSowInpt={setSowInpt}
        inputValue={currentCity.name}
        setCurrentCity={setCurrentCity}
        showGeoList={showGeoList}
        handleShowGeoList={handleShowGeoList}
      />
    </Wrapper>
  );
};

export default Location;
