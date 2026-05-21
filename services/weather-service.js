const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.resolve('../env/.env')})

class WeatherService {
    #apiKey = process.env.weather_api_key
    #weather // it'll store object from weather api
    getUrl(city , country) {
        // http://api.openweathermap.org/data/2.5/weather?q=bangkok,th&appid=***
        return `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.#apiKey}`;
    }
    set weather(value) {
        this.#weather = value;
        console.log(this.#weather)
    }
    get latitude() {
        return this.#weather.coord.lat
    }
    get longitude() {
        return this.#weather.coord.lon
    }
    get place() {
        return `${this.#weather.name} , ${this.#weather.sys.country}`
    }
    get temps() {
        return this.#weather.main.temp
    }
    get descript() {
        return this.#weather.weather[0].description
    }
    get currentDatetime() {
        // console.log(new Date(this.#weather.dt*1000 - (this.#weather.timezone * 1000))) // minus
        // console.log(new Date(this.#weather.dt*1000 + (this.#weather.timezone * 1000))) // plus
        return (new Date(this.#weather.dt*1000 + (this.#weather.timezone * 1000)))
        // return `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    }
}

module.exports = WeatherService
