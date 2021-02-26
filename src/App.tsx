import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// Pages
import Homepage from './pages/Home/Home';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import NotFoundPage from './pages/NotFound';
import Login from './pages/Login/Login';

//Components
import NavBar from './components/NavBar/NavBar';

import { getTokenFromResponse } from './utils';

const App = () => {
  const routeMatch = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    if (routeMatch.pathname === '/login') {
      setShowNavBar(false);
    }
  }, [routeMatch.pathname]);

  useEffect(() => {
    if (routeMatch.hash) {
      console.log(routeMatch.hash);

      const token = getTokenFromResponse(routeMatch.hash);

      localStorage.setItem('token', token);

      // make the request to get the user profile
      // store the user profile in localstorage and redux
      // redirect the app to the homepage
    }
  }, [routeMatch.hash]);

  return (
    <Suspense fallback={<div>Loading....</div>}>
      {showNavBar && <NavBar />}

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/my-library" component={MyLibrary} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
