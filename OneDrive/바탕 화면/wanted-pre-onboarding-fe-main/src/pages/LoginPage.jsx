import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
// import Modal from '../components/Modal';
import Sections from '../components/Sections';

export default function LoginPage() {
  return (
    <Sections>
      <LoginForm />
    </Sections>
  );
}
