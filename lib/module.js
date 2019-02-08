import path from 'path'
import consola from 'consola'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { runGraphqlMarkdown } from '@okgrow/graphql-markdown'

async function nuxtModule (moduleOptions) {
  const { srcDir, server } = this.nuxt.options
  const options = Object.assign({
    contentRoot: path.join(srcDir, '/markdown')
  }, moduleOptions)

  const {
    typeDefs,
    resolvers
  } = await runGraphqlMarkdown(options)

  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  })

  this.nuxt.renderer.app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )

  consola.info(`Starting GraphQL Server`)
  consola.success(`GraphQL Server Started at ${server.https ? 'https' : 'http'}://${server.host}:${server.port}/graphql\n`)
}

module.exports = nuxtModule
module.exports.meta = require('../package.json')
