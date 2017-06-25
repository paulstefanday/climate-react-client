// Load .env file
if(process.env.NODE_ENV === 'development') require('dotenv').load()

// Server
const { thinky, r, type, m } = require('../climate-models/thinky')
const { Campaign, Competition, Email, Part, Review, Submission, Training, User } = require('../climate-models')
const Koa = require('koa')
const send = require('koa-send')
const route = require('koa-route')
const mount = require('koa-mount')
const server = new Koa()
const assets = async (ctx) => await send(ctx, ctx.path, { root: __dirname + '/build' })
const app = route.get('*', async (ctx) => await send(ctx, './build/index.html'))

server
  .use(assets)
  .use(app)
  .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
