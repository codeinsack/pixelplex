import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';
import Articles from './containers/Articles';
import Form from './containers/Form';
import Modal from './components/Modal';

const App = () => (
  <div>
    <Layout>
      <Modal />
      <Switch>
        <Route path="/articles/:id/edit" component={Form} />
        <Route path="/articles/create" component={Form} />
        <Route path="/articles" component={Articles} />
        <Redirect from="/" to="/articles" />
      </Switch>
    </Layout>
  </div>
);

export default App;
