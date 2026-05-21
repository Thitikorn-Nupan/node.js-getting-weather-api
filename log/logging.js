const path = require('path')
module.exports = myLogging = {} // declare log object for exporting method
class Logging {
    static get #winston() {
        const {createLogger, format, transports} = require('winston')
        return {createLogger, format, transports}
    }
    static get log() {
        return this.#winston.createLogger({
            level: 'silly',
            format: this.#winston.format.combine(
                this.#winston.format.label({label: path.basename(process.mainModule.filename)}),
                this.#winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                this.#winston.format.printf((info) => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`)
            ),
            transports: [new this.#winston.transports.Console]
        })
    }
}

myLogging.log = Logging.log // add function to object
module.exports = myLogging