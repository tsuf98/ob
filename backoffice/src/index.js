import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const APOLLO_PORT = 4000 || process.env.APOLLO_PORT;
const GRAPHQL_PATH = '/graphql';

const uploadLink = createUploadLink({
  uri: `http://localhost:${APOLLO_PORT}${GRAPHQL_PATH}`
});

const apolloClient = new ApolloClient({
  link: uploadLink,
  uri: `http://localhost:${APOLLO_PORT}${GRAPHQL_PATH}`,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
