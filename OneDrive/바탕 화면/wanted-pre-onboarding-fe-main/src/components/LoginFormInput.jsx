import React, { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../App';

const ID_REGX = new RegExp(
  '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
); // 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
const PW_REGX = new RegExp('^[A-Z0-9]{8,}$'); // 대문자, 숫자, 특수문자, 8자이상

const ERROR_STATION = {
  required: 'border-error',
  invalidId: 'border-error',
  invalidPw: 'border-error',
};
export default function LoginFormInput({
  id,
  inputProps,
  errorState,
  setErrorState,
  refState,
  setRefState,
}) {
  const inputRef = useRef();
  const { formState, setFormState } = useContext(FormContext);

  const checkValidation = () => {
    let result;
    const value = formState[id];
    if (value.length === 0) {
      // console.log('required');
      result = 'required';
    } else {
      switch (id) {
        case 'id':
          result = ID_REGX.test(value) ? true : 'invalidId';
          break;
        case 'pw':
          result = PW_REGX.test(value) ? true : 'invalidPw';
          break;
        default:
          return;
      }
    }
    // react에서는 setState를 비동기적으로 실행한다.
    setErrorState((prev) => ({ ...prev, [id]: result }));

    if (id === 'id') {
      setRefState((prev) => ({
        ...prev,
        refId: inputRef.current.value,
        // refPw: ref.current.value,
      }));
    } else if (id === 'pw') {
      setRefState((prev) => ({
        ...prev,
        // refId: ref.current.value,
        refPw: inputRef.current.value,
      }));
    }
  };

  useEffect(() => {
    if (id === 'id') {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div>
        <input
          id={id}
          ref={inputRef}
          className={ERROR_STATION[errorState[id]]}
          value={formState[id]}
          onChange={(e) => setFormState({ ...formState, [id]: e.target.value })}
          onBlur={checkValidation}
          {...inputProps}
        />
      </div>
    </>
  );
}
