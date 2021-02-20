import React from 'react'
import styled, {css, keyframes} from 'styled-components';
import clear from 'assets/weatherIcons/64x64/clear.png'
import rain from 'assets/weatherIcons/64x64/rain.png'
import cloudy from 'assets/weatherIcons/64x64/cloudy.png'
import tstorms from 'assets/weatherIcons/64x64/tstorms.png'


const Wrapper = styled.div`
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: rgba(0,0,0,0.2);
    top: 0;
    right: 0;
    bottom: 0;
    left:0;

`
const MainCircle = styled.div`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
    background: #6C66BE;
    background-image: url(${tstorms});
    background-repeat: no-repeat;
    background-position: 50%;
`



const topToCenter = keyframes`
    0% {
        top: -101px;
    }
    20% {
        top: 0;
    }

    40% {
        top: 0;
    }
   
    60% {
        top: -101px;
    }
    80% {
        top: -101px;
        
    }
    100% {
        top: -101px;
        
    }
    `;

const leftToCenter = keyframes`
    0% {
        left: -101px;
    }
    20% {
        left: -101px;
    }

    40% {
        left: 0;
    }
   
    60% {
        left: 0;
    }
    80% {
        left: -101px;
    }
    100% {
        left: -101px;
    }
`;

const bottomToCenter = keyframes`
    0% {
        bottom: -101px;
    }
    20% {
        bottom: -101px;
    }

    40% {
        bottom: -101px;
    }
   
    60% {
        bottom: 0;
    }
    80% {
        bottom: 0;
    }
    81% {
        bottom: -101px;
    }
    100% {
        bottom: -101px;
    }
`;

const rightToCenter = keyframes`
    0% {
        right: -101px;
    }
    20% {
        right: -101px;
    }

    40% {
        right: -101px;

    }
   
    60% {
        right: -101px;

    }
    80% {
        right: 0px;
        opacity: 1
    }
    90% {
        opacity: 0;
    }
    100% {
        right: 0;

    }
`;


interface SlidingCircleProps {
    bgColor: string;
    position: string;
}

const SlidingCircle = styled(MainCircle)<SlidingCircleProps>`
    border: 0;
    position: absolute;
    background: ${({bgColor})=> bgColor};
    display: flex;
    justify-content:center;
    align-items: center;

    ${({position})=> position === 'top' && css`
        top: -101px;
        animation: 4s ${topToCenter} infinite;
    `}

    ${({position})=> position === 'left' && css`
        left: -101px;
        animation: 4s ${leftToCenter} infinite;
    `}
    ${({position})=> position === 'bottom' && css`
        bottom: -101px;
        animation: 4s ${bottomToCenter} infinite;
   `}

   ${({position})=> position === 'right' && css`
        right: -101px;
        animation: 4s ${rightToCenter} infinite;
   `}


`

const Img = styled.img`
    width: 64px;
    height: 64px;
`

interface LoaderProps {

}

const Loader: React.FC<LoaderProps> = () => {
    return (
        <>
            <Wrapper>
                <MainCircle>
                    <SlidingCircle bgColor="#5F9ADE" position="top">
                        <Img  src={clear} alt=""/>
                    </SlidingCircle>
                    <SlidingCircle bgColor="#A9AEB4" position="left">
                        <Img  src={cloudy}  alt=""/>
                    </SlidingCircle>
                    <SlidingCircle bgColor="#8391A4" position="bottom">
                    <Img  src={rain}  alt=""/>
                    </SlidingCircle>
                    <SlidingCircle bgColor="#6C66BE" position="right">
                        <Img  src={tstorms}  alt=""/>
                    </SlidingCircle>
                </MainCircle>
            </Wrapper>
        </>
    );
}
export default Loader;