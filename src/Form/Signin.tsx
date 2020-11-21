import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';

// API
import { API_ROUTES, API_URL } from '../Constant';

// STYLE
import '../App.css';

interface State {
  email: string;
  password: string;
  error: {
    email: boolean;
    password: boolean;
  };
  isSuccess: string;
}

interface Props {
  submit: (token: string) => void;
}

const SignIn = ({ submit }: Props) => {
  const [localState, setLocalState] = useState<State>({
    email: '',
    password: '',
    error: {
      email: false,
      password: false,
    },
    isSuccess: '',
  });

  const handleCheckEmail = (value: string) => {
    if (value.length === 0) {
      return setLocalState({
        ...localState,
        email: value,
        error: { ...localState.error, email: true },
      });
    }

    if (value.length > 0 && !validator.isEmail(value)) {
      return setLocalState({
        ...localState,
        email: value,
        error: { ...localState.error, email: true },
      });
    }

    setLocalState({
      ...localState,
      email: value,
      error: { ...localState.error, email: false },
    });
  };

  const handleCheckPassword = (value: string) => {
    if (value.length === 0) {
      return setLocalState({
        ...localState,
        password: value,
        error: { ...localState.error, password: true },
      });
    }

    setLocalState({
      ...localState,
      password: value,
      error: { ...localState.error, password: false },
    });
  };

  const handleSigninSubmit = async () => {
    const error = {
      email: localState.error.email,
      password: localState.error.password,
    };

    if (localState.email.length === 0) {
      error.email = true;
    }

    if (localState.password.length === 0) {
      error.password = true;
    }

    if (localState.password.length > 0) {
      error.password = false;
    }

    if (error.email || error.password) {
      return setLocalState({ ...localState, error });
    }

    try {
      const res = await axios.post(`${API_URL}/${API_ROUTES.SIGN_IN}`, {
        email: localState.email,
        password: localState.password,
      });

      submit(res.data.metadata.data);
    } catch (error) {
      setLocalState({
        ...localState,
        isSuccess: 'false',
      });
    }
  };

  return (
    <Container>
      {localState.isSuccess.length > 0 && localState.isSuccess === 'false' && (
        <Alert color='danger'>
          Sign in unsuccessfully, Please check your email or password
        </Alert>
      )}

      <div className='form-wrapper'>
        <p>Sign In</p>
        <Form>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  invalid={localState.error.email}
                  onChange={(v) => handleCheckEmail(v.target.value)}
                />
                <FormFeedback>Email is not valid</FormFeedback>
              </FormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={localState.error.password}
                  onChange={(v) => handleCheckPassword(v.target.value)}
                />
                <FormFeedback>Password is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Button color='warning' onClick={handleSigninSubmit}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default SignIn;
