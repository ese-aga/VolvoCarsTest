import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import './VolvoCarousel.css';
import { Link, Block, Text, Logo, TabNav, TabNavItem } from 'vcc-ui';
import CarsData from "../components/api/cars.json";

const VolvoCarousel = (cars: any) => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [active, setActive] = React.useState(4);
  const [carsValue, setActiveCars] = React.useState(CarsData);

  const chevronWidth = 40;
  let carsJson = CarsData;
  
  if(active !== 0 && carsValue.length !== 0){
     carsJson = carsValue;
  }

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <Logo type="spreadmark" height={10} /> 
      <TabNav enableLineTransition>
        <TabNavItem
          isActive={active === 1}
          onClick={() => {
            setActive(1);
            const carlist: any = [];
            carsJson.forEach(ele => {
                if(ele.bodyType === "estate"){
                    carlist.push(ele);
                }
              }
            );
            setActiveCars(carlist);
          }}
        >
          Crossover/Wagon
        </TabNavItem>
        <TabNavItem
          isActive={active === 2}
          onClick={() => {
            setActive(2);
            const carlist: any = [];
            carsJson.forEach(ele => {
                if(ele.bodyType === "suv"){
                    carlist.push(ele);
                }
              }
            );
            setActiveCars(carlist);
          }}
        >
          SUV
        </TabNavItem>
        <TabNavItem
          isActive={active === 3}
          onClick={() => {
            setActive(3);
            const carlist: any = [];
            carsJson.forEach(ele => {
                if(ele.bodyType === "sedan"){
                    carlist.push(ele);
                }
              }
            );
            setActiveCars(carlist);
          }}
        >
          Sedan
        </TabNavItem>
        <TabNavItem
          isActive={active === 4}
          onClick={() => {
            setActive(4);
            const carlist: any = [];
            setActiveCars(carlist);
          }}
        >
          All Cars
        </TabNavItem>
      </TabNav>
      
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={useWindowDimensions().width <= 768 ? 1 : 4 }
        gutter={30}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        
        { carsJson.map(ele => (
          <div style={{ height: 400, background: '#FFFFF', marginTop: "20%" }}>
            <div className="cards">
              <Block>
                <Text variant="bates">{ele.bodyType}</Text>
                <Block extend={{ textAlign: 'left' }}>
                  <Text subStyle="emphasis">{ele.modelName}
                    <Text variant="bates">  {ele.modelType}</Text>
                  </Text> 
                </Block>
                <div>
                  { <img className="VehicleImage" alt="car" src={`/../../${ele.imageUrl}`} /> }
                </div>

                <div className="VolvoLinks">
                  <Link href="https://www.volvocars.com/" arrow="right">
                    LEARN
                  </Link>
                  <Link href="https://www.volvocars.com/" arrow="right">
                    SHOP
                  </Link>
                </div>
              </Block>
            </div>
            
          </div>
        ))}
      </ItemsCarousel>
    </div>
  );
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default VolvoCarousel;