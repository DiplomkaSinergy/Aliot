//@ts-nocheck

import React from 'react'

import './ErrorPage.scss'

const ErrorPage = () => {
  return (
    <section className='ErrorPage'>
      <div className="ErrorPage__wrapper">
        <div className="ErrorPage__title">
          К сожалению запрашеваемая вами страница не найдена...
        </div>
      <div className="ErrorPage__gif">
        <img src="https://media1.tenor.com/m/PPOe9MawAvsAAAAd/404-not-found.gif" alt="error" />
      </div>
      </div>
    </section>
  )
}

export default ErrorPage