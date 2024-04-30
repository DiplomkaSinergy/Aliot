import './Menu.scss'

const Menu = () => {
  return (
    <div className=''>
        <div className="blur"/>
        <div className="menu__content" onClick={e => e.stopPropagation()}>
          <div className="menu__burgerbtn">
              <span/>
          </div>

        </div>
    </div>
  )
}

export {Menu}