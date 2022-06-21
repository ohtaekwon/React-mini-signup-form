import { logDOM } from '@testing-library/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Home from '../pages/Home';
import './LoginForm.css';

// 정규표현식

const ID_REGX = new RegExp(
  '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
); // 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
const PW_REGX = new RegExp('^[A-Z0-9]{8,}$'); // 대문자, 숫자, 특수문자, 8자이상

const validation = (value, id) => {
  if (value.length === 0) {
    console.log('required');
    return 'required';
  } else {
    switch (id) {
      case 'id':
        return ID_REGX.test(value) ? true : 'invalid';
      case 'pw':
        return PW_REGX.test(value) ? true : 'invalid';
      default:
        return;
    }
  }
};

export default function LoginForm() {
  const id = useRef();
  const password = useRef();
  const getId = localStorage.getItem('id');
  const getPw = localStorage.getItem('pw');

  const [state, setState] = useState({
    id: '',
    pw: '',
    idLog: '',
    pwLog: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const idValue = id.current.value;
    const idId = id.current.id;
    const pwValue = password.current.value;
    const pwId = password.current.id;

    if (
      validation(idValue, idId) === true &&
      validation(pwValue, pwId) === true
    ) {
      localStorage.setItem(idId, idValue);
      localStorage.setItem(pwId, pwValue);
      setState(() => ({ id: idValue, pw: pwValue, idLog: '', pwLog: '' }));
    } else {
      if (
        validation(idValue, idId) === 'invalid' ||
        validation(idValue, idId) === 'required'
      ) {
        setState((prev) => ({
          ...prev,
          id: idValue,
          pw: pwValue,
          idLog: 'fail',
        }));
      }
      if (
        validation(pwValue, pwId) === 'invalid' ||
        validation(pwValue, pwId) === 'required'
      ) {
        setState((prev) => ({
          ...prev,
          id: idValue,
          pw: pwValue,
          pwLog: 'fail',
        }));
      }
      alert('아이디 또는 비밀번호를 잘 못 입력하셨습니다.');
      id.current.value = '';
      password.current.value = '';
    }
  };
  const handleId = (e) => {};

  const handleForm = () => {
    setState(() => {
      return { id: '', pw: '', idLog: '', pwLog: '' };
    });
  };

  useEffect(() => {
    if (id === 'id') {
      id.current.focus();
    }
  }, []);

  return (
    <div>
      {getId && getPw ? (
        <Home />
      ) : (
        <form onSubmit={handleSubmit} onClick={handleForm}>
          <div>
            <input
              className={'id-input' + ' ' + state.idLog}
              id="id"
              type="text"
              ref={id}
              onChange={handleId}
            />
          </div>
          <div>
            <input
              className={'pw-input' + ' ' + state.pwLog}
              id="pw"
              type="password"
              ref={password}
              onChange={handlePw}
            />
          </div>
          <button onClick={handleButton}>Login</button>
        </form>
      )}
    </div>
  );
}
