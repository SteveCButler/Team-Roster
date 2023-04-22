import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1 className="text-white-50 mb-4">Welcome to Bandmates</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" variant="dark" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
