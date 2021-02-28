import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Pages
import Homepage from './pages/Home/Home';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import NotFoundPage from './pages/NotFound';
import Login from './pages/Login/Login';

//Components
import Authentication from './components/Authentication/Authentication';
import Loader from './components/Loader/Loader';
import AppLayout from './components/AppLayout/AppLayout';

const App = () => {
  return (
    <Suspense fallback={<Loader width={3} />}>
      <ToastContainer
        autoClose={3000}
        style={{ fontSize: '1.5rem' }}
        limit={1}
      />

      <Switch>
        <AppLayout exact path="/" component={Homepage} />
        <Route exact path="/auth-callback" component={Authentication} />
        <Route exact path="/login" component={Login} />
        <AppLayout exact path="/my-library" component={MyLibrary} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
