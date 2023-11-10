// Récupérer le formulaire
const form = document.querySelector("form")
const input = document.querySelector("input")
const météoHtml = document.querySelector(".météo")
// juste pour vérifié : console.log(form)
// Écouter l'évenement de soumission du formulaire 

// Clé API via le site "openweathermap"
const API_KEY = "6d0e5015b2efa4f62bd54e7cd65db0c7"

form.addEventListener("submit", function(event) {
    event.preventDefault()
    getData(input.value)
    form.reset()
})

// programme qui récupère les données météo
async function getData(city) {
    // Fetch permet de faire un appel html
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d0e5015b2efa4f62bd54e7cd65db0c7&units=metric&lang=fr`)
   const weather = await response.json()
   displayWeather(weather)
}

// Programme qui affiche les données météo 
function displayWeather(weather) {
    météoHtml.innerHTML = `
        <h1>Données Météo pour ${weather.name}</h1>
        <p>Temps ${weather.weather[0].description}</p>
        <p>Température ${Math.round(weather.main.temp)} °C </p>
        <p>Température Ressenti ${Math.round(weather.main.feels_like)} °C </p>
        <p>Humidité ${Math.round(weather.main.humidity)} % </p>
    `
}

// Géolocalisation
navigator.geolocation.getCurrentPosition(succes, error)

// En cas de succes (l'uilisateur accepte de donner sa position)
async function succes() {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d0e5015b2efa4f62bd54e7cd65db0c7&units=metric&lang=fr`
    const response = await fetch(url)
    const weather = await response.json()
    displayWeather(weather)
}

// En cas d'erreur (l'uilisateur refuse de donner sa position)
function error() {
        météoHtml.innerHTML = "<h2>Vous avez refuser de donner votre position</h2>"
}