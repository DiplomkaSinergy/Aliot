import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Filters from '../Blocks/Filters/Filters';
import { CatalogItem } from '../Blocks/CatalogItem/CatalogItem';
import { stringNameProp, useFilterStore } from '@/stores/filtersStore';
import { useProductStore } from '@/stores/productStore';
import './Catalog.scss';
import { Loading } from '../Blocks/Loading/Loading';


type CharIdKey<T extends stringNameProp> = `${T}CharId`;

const Catalog = () => {

  const getProducts = useProductStore(state => state.getProducts) 
  const products = useProductStore(state => state.products) 
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const loading = useFilterStore((state) => state.loading);

  useEffect(() => {
    getProducts()
  }, [getProducts]);
  
  
  const filtered = products.filter((product) => {
    
    // Проверяем, соответствует ли каждый продукт выбранным фильтрам

    return Object.entries(activeFilters).every(([key, value]) => {
    
      // Если фильтр пустой, то продукт проходит проверку
    
      if (value.length === 0) return true;
    
      const productKey = key as stringNameProp;
    
      const charIdKey: CharIdKey<typeof productKey> = `${productKey}CharId`;
    
      // Проверяем, соответствует ли значение продукта выбранному фильтру
    
      return value.includes(product[charIdKey]);
    
    });
  });

  return (
    <section className='Catalog'>
      <div className='container'>
        <div className='Catalog__wrapper'>
          <div className="Catalog__flex-filter">
            <Filters />

            {loading ? 
            <Loading/>
            :
             products.length === 0 ?
              <div className="Catalog__emptyz">
                <h1 className='Catalog__title'>Товаров пока что не нет.</h1>
                <div className="Catalog__gif">
                  <img src="https://i.gifer.com/Q0t0.gif" alt="gif" />
                </div>
              </div>
             :
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
            }
            
          </div>
        </div>
      </div>
    </section>
  );
};

export { Catalog };
