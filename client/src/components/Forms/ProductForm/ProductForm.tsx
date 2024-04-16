import React, { useEffect, useState } from 'react';
import { FieldError, Path, UseFormRegister, useForm } from 'react-hook-form';

import './ProductForm.scss';
import { useAdminStore } from '@/stores/adminStore';
import { CreateProductFormValues } from '../types.interface';
import { BadgeX, MessageCircleX, X } from 'lucide-react';
import { IFilter, useFilterStore } from '@/stores/filtersStore';

interface UsersFormProps {
  handleModal: () => void;
  activeModal: boolean;
  isCreating: boolean;
  currentItem: null;
}

interface IGridCharItemProps {
  name: Path<CreateProductFormValues>;
  filters: IFilter[];
  register: UseFormRegister<CreateProductFormValues>;
}


const ProductForm = ({
  handleModal,
  activeModal,
  isCreating,
  currentItem,
}: UsersFormProps) => {
  const createProduct = useAdminStore((state) => state.createProduct);
  const filters = useFilterStore((state) => state.filters);
  const getFilters = useFilterStore((state) => state.getFilters);
  const [info, setInfo] = useState<
    { title: string; description: string; number: number }[]
  >([]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number: number) => {
    setInfo(info.filter((item) => item.number !== number));
  };

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateProductFormValues>({ mode: 'onSubmit' });

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //     handleModal();
  //     getProducts()
  //   }
  // }, [isSubmitSuccessful]);

  const onSubmit = async ({
    name,
    price,
    picture,
    brandId,
    breakingCapacityId,
    degreeProectionId,
    displayId,
    numberPolesId,
    ratedCurrentId,
    ratedVoltageId,
    shutdownCruveId,
    typeOfMechanismId
  }: CreateProductFormValues) => {
    
    const formData = new FormData();  
    formData.append('name', name);
    formData.append('price', price);
    formData.append('picture', picture[0]);
    formData.append('info', JSON.stringify(info));
    formData.append('brandsCharId', brandId.toString());
    formData.append('breakingCapacityCharId', breakingCapacityId.toString());
    formData.append('degreeProtectionCharId', degreeProectionId.toString());
    formData.append('displayCharId', displayId.toString());
    formData.append('numberPolesCharId', numberPolesId.toString());
    formData.append('ratedCurrentCharId', ratedCurrentId.toString());
    formData.append('ratedVoltageCharId', ratedVoltageId.toString());
    formData.append('shutdownCruveCharId', shutdownCruveId.toString());
    formData.append('typeOfMechanismCharId', typeOfMechanismId.toString());

    
    if (isCreating) {
      console.log(formData);
      
      await createProduct(formData);
    } else {
      // const product = await updateProduct({id: currentItem.id ,name, price, description, type });
      return;
    }
  };

  return (
    <div className={activeModal ? 'overlay' : 'overlay__end'}>
      <div className='ProductForm'>
        <form className='ProductForm__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='ProductForm__wrapper'>
            <div className='ProductForm__title'>
              {isCreating ? 'Создание продукта' : `Обновление продукта`}
            </div>
            <div className='ProductForm__closed' onClick={handleModal}>
              <X color='black' />
            </div>

            <div className='flex-container'>
              <div className='flex-right'>
                <div className='flex-title'>Основная информация</div>

                <div className='ProductForm__wrapper'>
                  <label className='ProductForm__label'>Название:</label>
                  <input
                    type='text'
                    className={
                      errors?.name
                        ? 'ProductForm__input input-red'
                        : 'ProductForm__input '
                    }
                    {...register('name', {
                      required: 'Обязательное поле',
                      minLength: {
                        value: 3,
                        message: 'Минимум 3 символа',
                      },
                      // value: isCreating ? '' : currentItem.name,
                    })}
                  />
                  <div className='Form-error'>
                    {errors?.name && (
                      <p>{errors?.name?.message || 'Ошибка!'}</p>
                    )}
                  </div>
                </div>

                <div className='ProductForm__wrapper'>
                  <label className='ProductForm__label'>Цена:</label>
                  <input
                    type='number'
                    className='ProductForm__input'
                    {...register('price', {
                      // value: isCreating ? '' : currentItem.price,
                    })}
                  />
                  <div className='Form-error'>
                    {errors?.price && (
                      <p>{errors?.price?.message || 'Ошибка!'}</p>
                    )}
                  </div>
                </div>

                <div className='ProductForm__wrapper'>
                  <label className='ProductForm__label'>Картинка:</label>
                  <input
                    type="file"
                    id="picture"
                    name='picture'
                    className='ProductForm__input'
                    {...register("picture", {})}
                  />
                  <div className='Form-error'>
                    {errors?.picture && (
                      <p>{errors?.picture?.message || 'Ошибка!'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex-left'>
                <div className='flex-title'>Характеристики</div>

                <div className='grid-container'>
                  {/* {Object.entries(filters).map(([property, value]) => (
                    <GridCharItem
                      name={value[0]?.characteristic_name?.name}
                      filters={value}
                    />
                  ))} */}

                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.brands && filters?.brands[0]?.characteristic_name?.name}
                    </div>
                    <GridCharItem
                      name='brandId'
                      register={register}
                      filters={filters?.brands}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.breakingCapacity && filters?.breakingCapacity[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='breakingCapacityId'
                      register={register}
                      filters={filters?.breakingCapacity}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.degreeProtection && filters?.degreeProtection[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='degreeProectionId'
                      register={register}
                      filters={filters?.degreeProtection}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.display && filters?.display[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='displayId'
                      register={register}
                      filters={filters?.display}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.numberPoles && filters?.numberPoles[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='numberPolesId'
                      register={register}
                      filters={filters?.numberPoles}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.ratedCurrent && filters?.ratedCurrent[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='ratedCurrentId'
                      register={register}
                      filters={filters?.ratedCurrent}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.ratedVoltage && filters?.ratedVoltage[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='ratedVoltageId'
                      register={register}
                      filters={filters?.ratedVoltage}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.shutdownCruve && filters?.shutdownCruve[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='shutdownCruveId'
                      register={register}
                      filters={filters?.shutdownCruve}
                    />
                  </div>
                  <div className='grid-item'>
                    <div className='grid-item-title'>
                      {filters?.typeOfMechanism && filters?.typeOfMechanism[0]?.characteristic_name.name}
                    </div>
                    <GridCharItem
                      name='typeOfMechanismId'
                      register={register}
                      filters={filters?.typeOfMechanism}
                    />
                  </div>
                </div>
              </div>

              <div className='flex-end'>
                <div className='flex-title'>Описание</div>
                <button
                  type='button'
                  className='flex-end-add'
                  onClick={addInfo}
                >
                  Добавить описание
                </button>

                {info.map((item, i) => (
                  <div className='flex-end-list' key={i}>
                    <input
                      className='flex-end-input'
                      placeholder='Добавьте заголовок'
                      value={item.title}
                      onChange={(e) =>
                        changeInfo('title', e.target.value, item.number)
                      }
                    />
                    <input
                      className='flex-end-input'
                      placeholder='Добавьте значение'
                      value={item.description}
                      onChange={(e) =>
                        changeInfo('description', e.target.value, item.number)
                      }
                    />
                    <button
                      type='button'
                      className='flex-end-delete'
                      onClick={() => removeInfo(item.number)}
                    >
                      <BadgeX color='red' />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className='AuthForm__submitbtn' type='submit'>
              {isCreating ? 'Создать' : 'Обновить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export const GridCharItem = ({
  filters,
  register,
  name,
}: IGridCharItemProps) => {
  return (
    // <div className='grid-item'>
    //   <div className='grid-item-title'>{name}</div>
    //   <select className='grid-item-select'>
    //     <option value=''>--Выберите вариант--</option>
    //     {filters?.map((item) => (
    //       <option key={item.id} value={item.id}>
    //         {item.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>

    <select 
    className='grid-item-select'
    {...register(name)}
    >
      <option value=''>--Выберите вариант--</option>
      {filters?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export { ProductForm };
