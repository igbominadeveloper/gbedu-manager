import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/Home/Home';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import NotFoundPage from './pages/NotFound';

const App = () => (
  <Suspense fallback={<div>Loading....</div>}>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/my-library" component={MyLibrary} />
      <Route component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default App;
