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
import { IProduct, useProductStore } from '@/stores/productStore';


const Catalog = () => {
  const [brand, setBrand] = useState('Все');

  const getProducts = useProductStore(state => state.getProducts) 
  const products = useProductStore(state => state.products) 
  const activeFilters = useFilterStore((state) => state.activeFilters);

  useEffect(() => {
    getProducts()
    console.log(products);
    
  }, [getProducts]);
  
  const changeTab = (tab: string) => () => {
    setBrand(tab);
    console.log(tab);
  };

  

  const filtered = products.filter((product) => {
    // Проверяем, соответствует ли каждый продукт выбранным фильтрам
    return Object.entries(activeFilters).every(([key, value]) => {
      // Если фильтр пустой, то продукт проходит проверку
      if (value.length === 0) return true;
      // Проверяем, соответствует ли значение продукта выбранному фильтру
      return value.includes(product[key + 'CharId']);
    });
  });


  return (
    <section className='Catalog'>
      <div className='container'>
        <div className='Catalog__wrapper'>
          
          <div className="Catalog__flex-filter">
            <Filters />
            <div className='Catalog__list'>

              <TransitionGroup  component={null}>
                {filtered.map((item, i) => (
                  <CSSTransition
                      key={i}
                      timeout={300}
                      classNames="Catalog__item"
                      >
                  <CatalogItem item={item}/>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { Catalog };
