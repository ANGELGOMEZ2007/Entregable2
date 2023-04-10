import React from 'react'

const Loading = ({haserrorLocation}) => {
  

  return (
    <div className='container_loader'>

        
        {
          haserrorLocation
          ?
          <div className='loader' ></div>
          :
          <div className="alert">
            <p>🌞 Disculpe, pero su ubicación esta desactivada.🌜</p>
          </div>
        }
    </div>
  )
}

export default Loading