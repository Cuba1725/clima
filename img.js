
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(fetchClima);
}


function fetchClima(geolocationPosition){
    let coords = geolocationPosition.coords;
    let lat = coords.latitude;
    let long  = coords.longitude;    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=es&appid=0362deadd1874bfc51f07202b5600f63`)
    
    .then((response) => {return response.json();})
    .then((data) => { console.log(data)
    
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let temp = `${Math.round( data.main.temp)}°`;
    let tempMax = `${Math.round( data.main.temp_max )}°`;    
    let tempMin = `${Math.round( data.main.temp_min )}°`;
    let sensacion = `${Math.round( data.main.feels_like )}°`;
    let nombre = `${data.name}, ${data.sys.country}`;
    let descripcion = data.weather[0].description;
    //let pais = data.sys.country;
    let humedad = `${Math.round( data.main.humidity )}%`;
    let visibilidad = `${ (data.visibility) / 1000 } km`;
    let url = `img/${data.weather[0].icon}.png`;


    console.log("Ciudad: ",nombre);    
    console.log("Temp Actual: ",temp);    
    console.log("Sensacion Termica: ",sensacion);
    console.log("Temp Max: ",tempMax);
    console.log("Temp min: ",tempMin);
    console.log("Descripcion: ",descripcion);
    console.log("Humedad: ",humedad);
    console.log("Visibilidad: ",visibilidad);
    console.log("url: ", url);

    const img = document.querySelector('.img');
    const desc = document.querySelector('.descripcion');
    const ciudad = document.querySelector('.ciudad');
    const tempActual = document.querySelector('.tempActual');
    const tMax = document.querySelector('.tMax');
    const tMin = document.querySelector('.tMin');
    const Sterm = document.querySelector('.Sterm');
    const wind = document.querySelector('.viento');
    const saleSol = document.querySelector('.sunrise')
    const caeSol = document.querySelector('.sunset');
    
    img.setAttribute('src', url);
    img.setAttribute('alt', descripcion);
    desc.textContent = descripcion;
    ciudad.innerHTML = ` <i class="fas fa-map-marker-alt"></i> ${nombre} `;
    tempActual.textContent = temp;
    tMax.textContent = tempMax;
    tMin.textContent = tempMin;
    Sterm.textContent = sensacion;
    wind.textContent = visibilidad;

    let unix_timestamp = sunrise;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var saleElSol = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    console.log("El sol sale: ",saleElSol);
    saleSol.textContent = saleElSol;

    let unix_sunset = sunset;
    var date = new Date(unix_sunset * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var caeElSol = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    console.log("El sol se pone: ", caeElSol);
    caeSol.textContent = caeElSol;
    })

}

moment.locale('es');
let horario = document.querySelector('.hora');
setInterval(() => {
    let fEcha = moment().format('LL');
    let dia = moment().format('dddd');
    let hora = moment().format('LTS');
    horario.innerHTML = hora;        
}, 1000);

let hoy = `${moment().format('dddd')}, ${moment().format('LL')} `

console.log(hoy);




