// src/index.js
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    metas: (_, args, context, info) => {
      return context.prisma.query.metas({},info)
    },
    programs: (_, args, context, info) => {
      return context.prisma.query.programs({},info)
    },
    degrees: (_, args, context, info) => {
      return context.prisma.query.degrees({},info)
    },
    years: (_, args, context, info) => {
      return context.prisma.query.years({},info)
    },
    terms: (_, args, context, info) => {
      return context.prisma.query.terms({},info)
    },
    classes: (_, args, context, info) => {
      return context.prisma.query.classes({},info)
    },
  },
}

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => ({
        req,
        prisma: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://localhost:4466/'
        }),
    }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))
