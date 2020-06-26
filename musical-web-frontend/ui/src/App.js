import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {renderRoutes} from 'react-router-config';
import {ToastProvider} from 'react-toast-notifications'


function App({route}) {
  return (
    <div className="App">
      <ToastProvider autoDismiss autoDismissTimeout={2000} placement='top-center' transitionDuration={150}>
          {renderRoutes(route.routes)}
      </ToastProvider>
    </div>
  );
}

export default App;
