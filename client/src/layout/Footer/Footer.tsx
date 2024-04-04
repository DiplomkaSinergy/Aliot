import React from 'react'
import vk from '@/assets/icons/VK.svg'
import tg from '@/assets/icons/TG.svg'
import './Footer.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='footer'>
        <div className="container">
            <div className="footer__wrapper">
              <div className="footer__address">Адрес компании</div>
              <div className="footer__contact">
                <a href='tel:79646345553' className="footer__contact-phone">+1 234 567 89-00</a>
                \
                <a href='mailto:Email@index.ru' className="footer__contact-email">Email@index.ru</a>
              </div>
              <div className="footer__links">
                <a href='/' className="footer__vk">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="25" fill="#9E9E9E"/>
                  <path d="M26.2281 33.75C16.8324 33.75 11.4733 27.1809 11.25 16.25H15.9564C16.111 24.273 19.5807 27.6714 22.329 28.3721V16.25H26.7606V23.1694C29.4745 22.8716 32.3259 19.7185 33.2878 16.25H37.7194C37.3569 18.0488 36.6344 19.7521 35.597 21.2531C34.5596 22.7542 33.2297 24.0208 31.6904 24.9737C33.4086 25.8444 34.9262 27.0769 36.1431 28.5897C37.36 30.1025 38.2485 31.8613 38.75 33.75H33.8718C33.4216 32.1095 32.5067 30.641 31.2417 29.5285C29.9767 28.4161 28.4179 27.7091 26.7606 27.4962V33.75H26.2281Z" fill="#F5F5F5"/>
                  </svg>
                </a>
                <a href='/' className="footer__tg">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="50" rx="25" fill="#9E9E9E"/>
                  <path d="M35 15.7528L31.2432 35.3653C31.2432 35.3653 30.7176 36.7251 29.2736 36.073L20.6057 29.1907L20.5655 29.1704C21.7364 28.0817 30.8155 19.6283 31.2123 19.2452C31.8266 18.6517 31.4452 18.2984 30.732 18.7467L17.321 27.5662L12.147 25.7635C12.147 25.7635 11.3328 25.4635 11.2545 24.8114C11.1751 24.1582 12.1738 23.8049 12.1738 23.8049L33.2664 15.2362C33.2664 15.2362 35 14.4474 35 15.7528Z" fill="#F5F5F5"/>
                  </svg>
                </a>
              </div>
              <div className="footer__wrapper-copyrate">
                Название компании © {currentYear}
              </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer