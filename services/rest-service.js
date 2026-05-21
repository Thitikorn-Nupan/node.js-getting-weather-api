class RestService {
    #express
    #bodyParser
    #request
    constructor() {
        this.#bodyParser = require('body-parser')
        this.#express = require('express')
        this.#request = require('request')
    }
    get express() {
        return this.#express
    }
    get bodyParser() {
        return this.#bodyParser
    }
    get request() {
        return this.#request
    }
}

module.exports = RestService