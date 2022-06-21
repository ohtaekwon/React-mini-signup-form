import React, { forwardRef } from 'react';
import Home from '../pages/Home';
import LoginFormInput from './LoginFormInput';
import './LoginForm.css';
import { useState } from 'react';
import { useRef } from 'react';

const initialErrorData = {
  id: '',
  pw: '',
};

const initialRefData = {
  refId: '',
  refPw: '',
};

export default function LoginForm(props) {
  const [errorState, setErrorState] = useState(initialErrorData);
  const [refState, setRefState] = useState(initialRefData);

  const getId = localStorage.getItem('id');
  const getPw = localStorage.getItem('pw');

  const handleSubmit = () => {
    console.log(errorState);
    if (errorState.id === true && errorState.pw === true) {
      console.log('true');
      localStorage.setItem('id', refState.refId);
      localStorage.setItem('pw', refState.refPw);
      alert('로그인 되었습니다.');
    }
  };

  return (
    <>
      {getId && getPw ? (
        <Home />
      ) : (
        <form id="form" className="form" onSubmit={handleSubmit}>
          <LoginFormInput
            id={'id'}
            errorState={errorState}
            setErrorState={setErrorState}
            refState={refState}
            setRefState={setRefState}
            inputProps={{
              type: 'text',
              placeholder: '전화번호, 사용자의 이름 또는 이메일',
            }}
          />
          <LoginFormInput
            id={'pw'}
            errorState={errorState}
            setErrorState={setErrorState}
            refState={refState}
            setRefState={setRefState}
            inputProps={{
              type: 'password',
              placeholder: '비밀번호',
            }}
          />

          {errorState.id === true && errorState.pw === true ? (
            <button id="button" type="submit">
              로그인
            </button>
          ) : (
            <button disabled id="button" type="submit">
              로그인
            </button>
          )}
        </form>
      )}
    </>
  );
}
