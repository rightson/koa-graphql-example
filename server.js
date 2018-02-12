const Path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static')
const KoaSession = require('koa-session');
const GraphqlHTTP = require('koa-graphql');
const Mongoose = require('mongoose')
const schema = require('./components/schema')

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 3000
const DB_NAME = process.env.DB_NAME || 'koa-graphql-example'
const DB_CREDENTIAL = process.env.DB_CREDENTIAL || ''
const DB_URI = `mongodb://${DB_CREDENTIAL}localhost:27017/${DB_NAME}`
const UI_ROOT = process.env.UI_ROOT || Path.join(__dirname, '../ui/dist')


let db = Mongoose.connection;
db.on('error', () => { console.log(`Failed to connect to ${DB_URI}`); process.exit(-1) })
db.once('open', () => console.log(`+++ Connected to MongoDB +++`))
Mongoose.connect(DB_URI)
Mongoose.set('debug', NODE_ENV !== 'production');

const router = new Router();

router.all('/graphql', GraphqlHTTP({
  schema: schema,
  graphiql: true
}));

router.get('*', ctx => {
	ctx.body = '<h1>404 Page Not Found : (</h1>'
})

const app = new Koa();

app.use(KoaSession(app))
    .use(KoaStatic(UI_ROOT))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(PORT, () => console.log(`+++ Http Server is listening on port ${PORT} +++`))
