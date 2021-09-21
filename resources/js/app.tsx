import '../sass/app.scss';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Router from '@/router/Router';

const App = (): React.ReactElement => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
