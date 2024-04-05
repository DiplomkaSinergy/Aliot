// import Filters from '../Blocks/Filters/Filters';
// import { CatalogItemCompany } from '..';
// import './CatalogCompany.scss';
// import { List } from '..';
// import { useDeviceStore } from '@/stores/deviceStore';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const CatalogCompany = () => {
//   const { type } = useParams();

//   const getDevices = useDeviceStore((state) => state.getDevices);
//   const products = useDeviceStore((state) => state.products);
//   const filters = useDeviceStore((state) => state.filters);

//   console.log(products);
//   console.log(filters);

//   useEffect(() => {
//     getDevices(type);
//   }, []);

//   return (
//     <div className='CatalogCompany'>
//       <div className='container'>
//         <div className='CatalogCompany__wrapper'>
//           <div className='CatalogCompany__title'></div>
//           <div className='CatalogCompany__flex'>
//             <Filters
//               char1={filters.char1}
//               char2={filters.char2}
//               char3={filters.char3}
//               char4={filters.char4}
//             />
//             <div className='CatalogCompany__flex-list'>
//               <List
//                 items={products}
//                 rebderItems={(item) => (
//                   <CatalogItemCompany
//                     id={item.device.id}
//                     img={item.device.img}
//                     name={item.device.name}
//                     price={item.device.price}
//                   />
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { CatalogCompany };
