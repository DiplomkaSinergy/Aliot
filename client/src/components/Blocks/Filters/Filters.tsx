import React, { useEffect } from 'react';
import './Filters.scss';
import { IFilter, fullFilters, useDeviceStore } from '@/stores/deviceStore';
import { List } from '../List/List';
import { FiltersResponse, useFilterStore } from '@/stores/filtersStore';

const Filters = () => {
  const getFilters = useFilterStore((state) => state.getFilters);
  const filters = useFilterStore((state) => state.filters);

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  return (
    <div className='Filters'>
      <div className='Filters__wrapper'>
        <div className='Filters__title'>
          {filters?.brands &&
            filters.brands.length > 0 &&
            filters.brands[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.brands} />

        <div className='Filters__title'>
          {filters?.breakingCapacities &&
            filters.breakingCapacities.length > 0 &&
            filters.breakingCapacities[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.breakingCapacities} />

        <div className='Filters__title'>
          {filters?.degreesOfProtection &&
            filters.degreesOfProtection.length > 0 &&
            filters.degreesOfProtection[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.degreesOfProtection} />

        <div className='Filters__title'>
          {filters?.displays &&
            filters.displays.length > 0 &&
            filters.displays[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.displays} />
        <div className='Filters__title'>
          {filters?.numberPoles &&
            filters.numberPoles.length > 0 &&
            filters.numberPoles[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.numberPoles} />
        <div className='Filters__title'>
          {filters?.ratedCurrents &&
            filters.ratedCurrents.length > 0 &&
            filters.ratedCurrents[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.ratedCurrents} />
        <div className='Filters__title'>
          {filters?.ratedVoltages &&
            filters.ratedVoltages.length > 0 &&
            filters.ratedVoltages[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.ratedVoltages} />
        <div className='Filters__title'>
          {filters?.shutdownCurves &&
            filters.shutdownCurves.length > 0 &&
            filters.shutdownCurves[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.shutdownCurves} />
        <div className='Filters__title'>
          {filters?.typesOfMechanism &&
            filters.typesOfMechanism.length > 0 &&
            filters.typesOfMechanism[0]?.characteristic_name?.name}
        </div>
        <FiltersBlock items={filters.typesOfMechanism} />
      </div>
    </div>
  );
};

interface FiltersBlockProps {
  items: IFilter[] | undefined;
}

export const FiltersBlock = ({ items }: FiltersBlockProps) => {
  return (
    <List
      items={items}
      rebderItems={(item) => (
        <label htmlFor={`${item.name}`} className='Filters__label'>
          <input
            name='value'
            type='checkbox'
            className='Filters__input'
            id={`${item.name}`}
          />
          <div className='Filters__charName'>{item.name}</div>
        </label>
      )}
    />
  );
};

export default Filters;
