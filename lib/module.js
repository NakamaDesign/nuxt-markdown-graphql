import path from 'path'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'

import { runGraphqlMarkdown } from '@okgrow/graphql-markdown'

async function nuxtModule (moduleOptions) {
  const options = Object.assign({
    contentRoot: path.join(this.nuxt.options.srcDir, '/markdown')
  }, moduleOptions)

  // eslint-disable-next-line
  console.log(options)

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

  // eslint-disable-next-line
  console.log('GraphQL Server Started! http://localhost:3000/graphql')
}

module.exports = nuxtModule
module.exports.meta = require('../package.json')
