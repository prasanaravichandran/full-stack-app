/*
 * Main file 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat } from "@apollo/client";
import './index.scss';

// Link to GraphQL server URL
const httpLink = new HttpLink({ uri: '/graphql' });

// Authentication middleware
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authentication: sessionStorage.getItem('sessionToken') || null,
    }
  }));
  return forward(operation);
});

// Initializing appolo client
const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: concat(authMiddleware, httpLink),
});

// React main render function
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
