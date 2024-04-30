import { Heart} from 'lucide-react'
import { useCartLikedStore } from '@/stores/cartLikedStore'
import { CatalogItem } from '@/components'
import { Link } from 'react-router-dom'
import { Paths } from '@/app/Routes/Types/paths'
import socketZag from '../../../../assets/img/socketZag.jpg'
import './Favorites.scss'

const Favorites = () => {
  const likedItems = useCartLikedStore(state => state.likedItems)

  return (
    <section className='Favorites'>
        <div className="Favorites__flex">
          <div className="Favorites__icon"><Heart /></div>
          <div className="Favorites__title">Понравившиеся товары</div>
        </div>

        {likedItems.length === 0 ? 
        <div className="Favorites__empty">
            <div className="Favorites__empty-title">Ваш список пуст</div>
            <div className="Favorites__empty-img"><img src={socketZag} alt="socket" /></div>
            <Link to={Paths.Catalog} className="Favorites__empty-link">Посмотреть</Link>
        </div>
        :
          <div className="Favorites__list">
              {likedItems.map(item => (
                <CatalogItem item={item} key={item.id}/>
              ))}
          </div>
        }
    </section>
  )
}

export default Favorites