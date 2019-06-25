import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {createStore, applyMiddleware} from 'redux';
import { Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { userLoggedIn } from './actions/auth';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore( 
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

if(localStorage.ecommerceJWT) {
    const user = {
        auth_token: localStorage.ecommerceJWT,
        isConfirmed: true
    };
    setAuthorizationHeader(localStorage.ecommerceJWT)
    store.dispatch(userLoggedIn(user))
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
document.getElementById('root')
);
serviceWorker.unregister();
