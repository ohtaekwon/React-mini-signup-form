import React from 'react';
import { useRef, useState } from 'react';
import './LoginForm.css';

export default function LoginForm() {
  // 포커스를 주기 위한 useRef
  const inutRef = useRef([]); // ref 배열형태로 저장해서 여러 값을 인덱스로 컨트롤 가능

  // input value state 관리
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });
  const { id, password, email } = inputs; // 구조분해할당

  //유효한 id, password, email 조건 변수에 담아 사용
  const vaildId = id.length >= 6 && id.length <= 20;
  const vaildPassword = password.length >= 12 && password.length <= 20;
  const regexp = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/; // email 형식 정규표현식
  const vaildEmail = email.match(regexp);

  // onChange 함수로 state 값 바꿔주기
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 클릭이벤트 : 유효성에 맞는 이벤트 이루어지도록
  const handleClick = () => {
    if (!vaildId) {
      alert('유효하지 않은 id 입니다.'); // 알람창
      setInputs({
        // 값 비워주기
        ...inputs,
        id: '', // 바뀐 값 빼고 나머지는 그대로 스프레드 연산자
      });
      inutRef.current[0].focus(); // 자동 포커스
    } else if (!vaildPassword) {
      alert('유효하지 않은 password 입니다.');
      inutRef.current[1].focus();
      setInputs({
        ...inputs,
        password: '',
      });
    } else if (!vaildEmail) {
      alert('유효하지 않은 email 입니다.');
      inutRef.current[2].focus();
      setInputs({
        ...inputs,
        email: '',
      });
    } else {
      return alert('회원가입 성공!');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="id"
          placeholder="6글자 이상 20글자 이하"
          value={id}
          onChange={handleChange}
          ref={(el) => (inutRef.current[0] = el)}
        />
        {vaildId ? null : <span>유효하지 않은 id 입니다.</span>}
      </div>
      <div>
        <input
          type="text"
          name="password"
          placeholder="12글자 이상 20글자 이하"
          value={password}
          onChange={handleChange}
          ref={(el) => (inutRef.current[1] = el)}
        />
        {vaildPassword ? null : <span>유효하지 않은 password 입니다.</span>}
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="유효한 이메일 작성"
          value={email}
          onChange={handleChange}
          ref={(el) => (inutRef.current[2] = el)}
        />
        {vaildEmail ? null : <span>유효하지 않은 e-mail입니다.</span>}
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={id.length < 1 && password.length < 1 && email.length < 1}
      >
        회원가입
      </button>
    </div>
  );
}
