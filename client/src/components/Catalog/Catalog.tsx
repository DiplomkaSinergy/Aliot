import React, { useEffect, useState } from 'react';
import { dataCompanies } from './data/data';
import {CatalogPreviewItem} from '..';
import { List } from '..';
import './Catalog.scss';
import { brands } from './data/tabs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Filters from '../Blocks/Filters/Filters';
import { CatalogItem } from '../Blocks/CatalogItemCompany/CatalogItem';
import { useFilterStore } from '@/stores/filtersStore';


const Catalog = () => {
  // const [brand, setBrand] = useState('Все');

  
  // const changeTab = (tab: string) => () => {
  //   setBrand(tab);
  //   console.log(tab);
  // };

  // const filtersData = dataCompanies.filter(item => {
  //   if (brand === 'Все') {
  //     return dataCompanies
  //   }
  //   return item.tag.toLowerCase() === brand.toLowerCase()
  // })

  return (
    <section className='Catalog'>
      <div className='container'>
        <div className='Catalog__wrapper'>
          <div className='Catalog__flex'>
            {/* <div className='Catalog__title'>Производители:</div> */}
            {/* <div className='Catalog__tabs'>
              <List
                items={brands}
                rebderItems={(item, i) => (
                  <div
                    onClick={changeTab(item.title)}
                    key={i}
                    className={brand === item.title ? 'Catalog__tab-active Catalog__tab' : 'Catalog__tab'}
                  >
                    {item.title}
                  </div>
                )}
              />
            </div> */}
          </div>
          
          <div className="Catalog__flex-filter">
            <Filters />
            {/* <div className='Catalog__list'>

              <TransitionGroup  component={null}>
                {filtersData.map((item, i) => (
                  <CSSTransition
                      key={i}
                      timeout={300}
                      classNames="Catalog__item"
                      >
                  <CatalogItem />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
};

export { Catalog };
