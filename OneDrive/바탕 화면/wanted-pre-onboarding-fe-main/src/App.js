import React, { useState, createContext } from 'react';
import LoginForm from './components/LoginForm';
// import LoginForm from './pages/LoginForm';
// import PreAssignmentGuide from './pages/PreAssignmentGuide';
import LoginPage from './pages/LoginPage';

const initialFormData = {
  id: '',
  pw: '',
};
export const FormContext = createContext({
  formState: initialFormData,
  setFormData: () => {},
});

function App() {
  const [formState, setFormState] = useState(initialFormData);
  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      <LoginPage />
    </FormContext.Provider>
  );
}

export default App;
