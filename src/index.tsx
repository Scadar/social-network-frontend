import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import {CssBaseline} from '@mui/material';
import ThemeContainer from './ThemeContainer';
import {store} from './store/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import IoProvider from './socket/IoProvider';

ReactDOM.render(
    <React.StrictMode>
      <ThemeContainer>
        <CssBaseline/>
        <Provider store={store}>
          <BrowserRouter>
            <IoProvider>
              <App/>
            </IoProvider>
          </BrowserRouter>
        </Provider>
      </ThemeContainer>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
