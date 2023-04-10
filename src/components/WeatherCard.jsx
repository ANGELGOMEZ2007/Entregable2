import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature }) => {

  const [isCelsius, setIsCelsius] = useState(true)

  const handleChangeTemperature = () => setIsCelsius(!isCelsius)

  document.body.style.backgroundImage = "url('/images/" + weather?.weather[0].icon + ".jpg')";

  return (
    <>
      
      <p className='title__country'>{weather?.name}, {weather?.sys.country}</p>
      <section className='section__container'>
        <div className="box__image">
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
        </div>
        <article className='box__info'>
          <p className='p__description'>"{weather?.weather[0].description}"</p>
          <div className="box__ul">
            <ul className='ul__title'>
              <li>Wind Speed <span>{weather?.wind.speed}m/s</span></li>
              <li>Clouds  <span>{weather?.clouds.all}%</span></li>
              <li>Pressure <span>{weather?.main.pressure}hPa</span></li>
            </ul>
          </div>
        </article>
      </section>
      <h2>{
        isCelsius
          ? `${temperature?.celsius} °C`
          : `${temperature?.farenheit} °F`
      }</h2>
      <button className='button' onClick={handleChangeTemperature}>Change to {isCelsius ? '°F' : '°C'}</button>
    </>
  )
}

export default WeatherCard