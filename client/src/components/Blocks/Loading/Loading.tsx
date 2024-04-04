import { FC } from 'react';
import './Loading.scss';

const Loading: FC = () => {
  return (
    <div className='loading'>
      <span className='loader'></span>
    </div>
  );
};

export { Loading };
