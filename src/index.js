import React from 'react';
import ReactDOM from 'react-dom';
import ProgramMapApp from './components/ProgramMapApp';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ProgramMapApp />
  </ApolloProvider>,
  document.getElementById('root')
);