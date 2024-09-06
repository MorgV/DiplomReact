import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <App />
    <Helmet>
      <meta charSet="utf-8" />
      <title>Запчасти для форда</title>
      <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </Context.Provider>
  </React.StrictMode>
);

  