import React, { useState } from 'react';
import { Container, Alert } from 'reactstrap';

// COMPONENT
import SignUp from './Form/Signup';

// STYLE
import './App.css';
import SignIn from './Form/Signin';

interface State {
  token: string;
}

const App = () => {
  const [localState, setLocalState] = useState<State>({
    token: '',
  });

  const isAuthenticated = localState.token.length > 0;

  const handleSigninSubmit = (token: string) => {
    setLocalState({ token });
  };

  return (
    <Container className='app'>
      {isAuthenticated && (
        <Alert color='warning'>
          The token will be expired if you refresh the page
        </Alert>
      )}
      {!isAuthenticated && <SignUp />}
      <hr />
      {!isAuthenticated && <SignIn submit={handleSigninSubmit} />}

      {isAuthenticated && (
        <p className='text-info token-wrapper'>
          Your token is: <span>{localState.token}</span>
        </p>
      )}
    </Container>
  );
};

export default App;
