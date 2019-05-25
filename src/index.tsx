import 'rxjs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import App from './core/App';
import store from './store/configureStore';
import './styles.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store()}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
