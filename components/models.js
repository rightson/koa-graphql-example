const Mongoose = require('mongoose')


const CounterSchema = new Mongoose.Schema({
    counter: { type: Number, default: 0 }
})

const Counter = Mongoose.model('Counter', CounterSchema)

module.exports = {
    Counter
}
