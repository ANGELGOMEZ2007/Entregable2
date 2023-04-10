import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.css'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import Select from 'react-select'


function App() {

  const [latlon, setLatlon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [haserrorLocation, setHaserrorLocation] = useState(true)
  const [country, setCountry] = useState()

  const handlerCountry = e => {
    setCountry(e.value)
  }


  const options = [
    { value: 'argentina', label: 'Argentina' },
    { value: 'brazil', label: 'Brasil' },
    { value: 'colombia', label: 'Colombia' },
    { value: 'chile', label: 'Chile' },
    { value: 'mexico', label: 'México' },
    { value: 'peru', label: 'Perú' },
    { value: 'venezuela', label: 'Venezuela' }
  ]
  
  useEffect(() => {


    const succes = pos => {

      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatlon(obj)
    }


    const error = err => {
      console.log(err);
      setHaserrorLocation(false)
    }


    navigator.geolocation.getCurrentPosition(succes, error)
  }, [])


  useEffect(() => {
    if (country) {

      const urlCoutry = `https://restcountries.com/v3.1/name/${country}`

      axios.get(urlCoutry)
        .then(res => {
          const obj = {
            lat: res.data[0].capitalInfo.latlng[0],
            lon: res.data[0].capitalInfo.latlng[1]
          }
          setLatlon(obj)
        })
        .catch(err => console.log(err))
    }
  }, [country])



  useEffect(() => {
    if (latlon) {
      const apikey = 'a4e59573392469b65b56ddbd2cf15e79'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`
      axios.get(url)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * 9 / 5 + 32).toFixed(1)

          setTemperature({ celsius, farenheit })
          setWeather(res.data)
          

        })
        .catch(err => console.log(err))
    }

  }, [latlon])

  return (
    <div className="App">
      {
        weather ?
          <div className="box__container">

            <h1 className='title__text'>Weather App</h1>

            <Select className='select__input' onChange={handlerCountry}  options={options} />

            <WeatherCard
              weather={weather}
              temperature={temperature}
            />
             </div>

          :
          <Loading haserrorLocation={haserrorLocation} />
      }
    </div>
  )
}

export default App
