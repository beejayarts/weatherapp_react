import './App.css';
import React, {useState} from 'react';

const api = {
  key: '3e49e6911ed0bd5b763bc930faa6bfec',
  base: 'http://api.openweathermap.org/data/2.5/'
}

//http://api.openweathermap.org/data/2.5/weather?q=$Taraba&units=metric&appid=3e49e6911ed0bd5b763bc930faa6bfec


function App() {
 const [city,setCity] = useState('');
 const [weather,setWeather] = useState({});

 const search =(e)=>{
    if(e.key==='Enter'){
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then((res)=>res.json())
      .then((data)=>{
        setWeather(data);
        setCity('');
        console.log(data);
      })
      .catch(err=>{
        console.log(err.message)
      })
      
  
    }
    
 }

 //function to display date 
 const datebuilder = (d)=>{
    let days =['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday']
    let months = ['January','February','March','april','may','june','july','August','september','october','november','december']
    let today = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();
    return ` ${today} ${date} ${month} ${year} `
  }

  //Determine class and change background
 


  return (
    <div className='App warm'>
     <div className='main'>
        <div className='searchdiv'>
            <input className='searchbox' placeholder='search...'
             type='text' onChange={e=>setCity(e.target.value)} 
             value={city} onKeyPress={search}/>
        </div>

       {(typeof weather.main!='undefined')?
       
        (
          <div>
        <div className='locationbox'>
          <div className='location'>{weather.name},{weather.sys.country}</div>
          <div className='date'>{datebuilder(new Date())}</div>
          <div className='temperature'>{Math.round(weather.main.temp)}°c</div>
          <div className='weather'>{weather.weather[0].description}</div>
        </div>
        </div>
        ) :('')
       
       }

     </div>
    </div>
  );
}

export default App;
