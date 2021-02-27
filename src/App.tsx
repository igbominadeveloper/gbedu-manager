import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Pages
import Homepage from './pages/Home/Home';
import MyLibrary from './pages/MyLibrary/MyLibrary';
import NotFoundPage from './pages/NotFound';
import Login from './pages/Login/Login';

//Components
import NavBar from './components/NavBar/NavBar';
import Authentication from './components/Authentication/Authentication';
import { convertUserStringToJson } from './utils';
import { getUserProfileSuccess } from './store/actions';

const App = () => {
  const routeMatch = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    if (
      routeMatch.pathname === '/login' ||
      routeMatch.pathname === '/auth-callback'
    ) {
      setShowNavBar(false);
      return;
    }

    setShowNavBar(true);

    return () => setShowNavBar(true);
  }, [routeMatch.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let authenticatedUser = localStorage.getItem('auth-user');

    if (!token) {
      history.push('/login');
      return;
    }

    if (authenticatedUser) {
      const hydratedUserObject = convertUserStringToJson(
        authenticatedUser || ''
      );

      dispatch(getUserProfileSuccess(hydratedUserObject));
      return;
    }
  }, [dispatch, history]);

  return (
    <Suspense fallback={<div>Loading....</div>}>
      {showNavBar && <NavBar />}

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth-callback" component={Authentication} />
        <Route exact path="/my-library" component={MyLibrary} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
