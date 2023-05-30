import React,  { Dispatch, useEffect }  from 'react';
import './App.css';
import User from './pages/User';
import { useDispatch } from 'react-redux';
import { getUsers } from './store/slices/userSlice';




function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="App">
      <User/>
    </div>
  );
}

export default App;
