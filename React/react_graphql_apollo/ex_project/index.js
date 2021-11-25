const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const supplies = require('./typedefs-resolvers/supplies')

const typeDefs = [
  queries,
  mutations,
  supplies.typeDefs,
]

const resolvers = [
  supplies.resolvers
]

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})
