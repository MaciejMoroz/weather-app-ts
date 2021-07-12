import React from 'react';
import styled, { css } from 'styled-components';
import LoaderSecondary from 'Components/Loader/LoaderSecondary';
import { ICity } from 'App';

const Wrapper = styled.div<{ showGeoList: boolean }>`
  background: ${({ theme }) => theme.colors.white};
  color: #000;
  z-index: 100;
  height: 100%;
  position: relative;
  padding: ${({ theme }) => theme.space.base};
  top: 8px;
  ${({ showGeoList }) =>
    showGeoList &&
    css`
      top: 64px;
    `}
`;

const CityElement = styled.button`
  width: 100%;
  border-bottom: 1px solid #000;
  padding: 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface ICityListProps {
  errorMsg: string | null;
  isLoading: boolean;
  cityList: ICity[];
  handleSetCityFromList: (city: ICity) => void;
  showGeoList?: boolean;
}

const CityList: React.FC<ICityListProps> = ({
  errorMsg,
  isLoading,
  cityList,
  handleSetCityFromList,
  showGeoList,
}) => {
  return (
    <Wrapper showGeoList={showGeoList || false}>
      <>
        {errorMsg && <p>{errorMsg}</p>}
        {isLoading ? (
          <LoaderWrapper>
            <LoaderSecondary />
          </LoaderWrapper>
        ) : (
          cityList.map((city) => (
            <CityElement
              key={city.lat}
              onClick={() => handleSetCityFromList(city)}
            >
              {city?.name} - {city?.country}
            </CityElement>
          ))
        )}
      </>
    </Wrapper>
  );
};
export default CityList;
