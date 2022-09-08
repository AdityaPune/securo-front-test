import ReactDOM from 'react-dom';
import Root from './root'
import { Provider } from 'react-redux';
import { Web3ContextProvider } from './hooks/web3/index';
import reportWebVitals from './reportWebVitals';
import store from "./store/store";
import CustomThemeProvider from './theme/CustomThemeProvider';
import './index.css';
import AuthProvider from './services/auth/authProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Web3ContextProvider>
      <CustomThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </AuthProvider>
      </CustomThemeProvider>
    </Web3ContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
