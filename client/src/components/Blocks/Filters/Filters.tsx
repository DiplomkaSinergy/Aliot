import React, { ChangeEvent, useEffect } from 'react';
import { List } from '../List/List';
import { IFilter, stringNameProp, useFilterStore } from '@/stores/filtersStore';
import { Loading } from '../Loading/Loading';
import './Filters.scss';

const Filters = () => {
  const getFilters = useFilterStore((state) => state.getFilters);
  const filters = useFilterStore((state) => state.filters);
  const loading = useFilterStore((state) => state.loading);

  useEffect(() => {
    getFilters();
  }, [getFilters]);



  return (
    <div className='Filters'>
      <div className='Filters__wrapper'>
        {loading ? <Loading/> : 
        <>
        <div className='Filters__title'>
          {filters?.brands && 
            filters.brands[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='brands' items={filters.brands} />

        <div className='Filters__title'>
          {filters?.breakingCapacity &&
            filters.breakingCapacity[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='breakingCapacity' items={filters.breakingCapacity} />

        <div className='Filters__title'>
          {filters?.degreeProtection &&
            filters.degreeProtection[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='degreeProtection' items={filters.degreeProtection} />

        <div className='Filters__title'>
          {filters?.display &&
            filters.display[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='display' items={filters.display} />
        <div className='Filters__title'>
          {filters?.numberPoles &&
            filters.numberPoles[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='numberPoles' items={filters.numberPoles} />
        <div className='Filters__title'>
          {filters?.ratedCurrent &&
            filters.ratedCurrent[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='ratedCurrent' items={filters.ratedCurrent} />
        <div className='Filters__title'>
          {filters?.ratedVoltage &&
            filters.ratedVoltage[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='ratedVoltage' items={filters.ratedVoltage} />
        <div className='Filters__title'>
          {filters?.shutdownCruve &&
            filters.shutdownCruve[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='shutdownCruve' items={filters.shutdownCruve} />
        <div className='Filters__title'>
          {filters?.typeOfMechanism &&
            filters.typeOfMechanism[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock filterName='typeOfMechanism' items={filters.typeOfMechanism} />
        </>
        }
      </div>
    </div>
  );
};

interface FiltersBlockProps {
  items: IFilter[] | undefined;
  filterName: stringNameProp;
}

export const FiltersBlock = ({ items, filterName }: FiltersBlockProps) => {
  const updateActiveFilters = useFilterStore((state) => state.updateActiveFilters);
  
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const filterId = parseInt(value);
    const filterName = event.target.name as stringNameProp

    updateActiveFilters(filterName, filterId, checked);
    
  };

  return (
    <List
      items={items}
      renderItems={(item) => (
        <label htmlFor={`${item.name}`} className='Filters__label'>
          <input
            value={item.id}
            name={filterName}
            type='checkbox'
            className='Filters__input'
            id={`${item.name}`}
            onChange={handleCheckboxChange}
          />
          <div className='Filters__charName'>{item.name}</div>
        </label>
      )}
    />
  );
};

export default Filters;
