const RestService = require('../services/rest-service')
const WeatherService = require('../services/weather-service')
const log = require('../log/logging').log
const RestServiceInstead = new RestService()
const WeatherServiceInstead = new WeatherService()
const request = RestServiceInstead.request
const express = RestServiceInstead.express
const bodyParser = RestServiceInstead.bodyParser
const app = express()

// setting for request Json body (middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
/**
 # Using PowerShell built-in Invoke-RestMethod (recommended in PowerShell)
 # In this PowerShell session, send the request:
 Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/weather' `
 -ContentType 'application/json' `
 -Body '{"city":"Bangkok","country":"th"}'
 */
app.post('/api/weather' , function (req , res) {
    const {city , country} = req.body
    log.info(JSON.stringify(req.body))
    const url = WeatherServiceInstead.getUrl(city,country)
    request(url , function (err, response, body) {
        WeatherServiceInstead.weather = JSON.parse(body)
        if (!err) {
            res.status(202).json({
                latitude:WeatherServiceInstead.latitude ,
                longitude:WeatherServiceInstead.longitude ,
                place:WeatherServiceInstead.place ,
                temp:WeatherServiceInstead.temps ,
                description:WeatherServiceInstead.descript,
                datetime:WeatherServiceInstead.currentDatetime
            })
        }
        else  {
            throw err
        }
    })
}).listen(3000 , function (err) {
    if (!err) log.debug('services in port 3000')
    else throw err
})

