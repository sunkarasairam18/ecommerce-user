import './App.css';
import { useState,useEffect } from 'react';
import Header from './components/Header';
import MenuHeader from './containers/MenuHeader';
import { setCategories } from './Store/reducer';
import { axiosInstance } from './api/axios';
import { useSelector,useDispatch } from 'react-redux';

import io from 'socket.io-client';


function App() {
  const cat = useSelector(state => state.data.categories);
  const ticket = useSelector(state => state.data.token);
  const dispatch = useDispatch();
  const [ socket,setSocket] = useState(null);

  useEffect(()=>{
    setSocket(io.connect("http://localhost:3000"));    
  },[])


  async function getCategories() {
    const res = await axiosInstance.get("/category/get");
    if (res.status === 200) {
      dispatch(setCategories(res.data));       
    }
  }

 
  useEffect(() => {
    
    if(ticket) getCategories();    
  }, [ticket]);

  useEffect(()=>{
    if(socket){
      socket.on("categories_change",(data)=>{
        console.log(data);
        getCategories();
      });
    }
  },[socket]);

  return (
    <div className="App">
      <Header/>
      <MenuHeader/>
    </div>
  );
}

export default App;
