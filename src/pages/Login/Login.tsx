import { FunctionComponent } from 'react';

import './Login.scss';

const Login: FunctionComponent = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirecUri = process.env.REACT_APP_REDIRECT_URI || '';

  return (
    <div className="login">
      <a
        href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          redirecUri
        )}&response_type=token`}
        className="login-button"
      >
        Login
      </a>
    </div>
  );
};

export default Login;
