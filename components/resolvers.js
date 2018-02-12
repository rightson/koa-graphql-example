const {
    Counter
} = require('./models')


let resolvers = {}

resolvers.counter = async function () {
    let counter = await Counter.findOne()
    return counter.counter
}

resolvers.counterUpdate = async function () {
    let counter = await Counter.findOne()
    counter.counter += 1
    await counter.save()
    return counter.counter
}

module.exports = resolvers
