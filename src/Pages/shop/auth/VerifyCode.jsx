import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

const VerifyCode = () => {

  const [code,setCode] = useState('');  

  const { id } = useParams();
  
  useEffect(() => {
      const abortCont = new AbortController();

      axios.get(`/customer/${id}`)
      .then((data) => {
          setCode(data.data.code);
      }).catch(err => console.log(err));

      return () => abortCont.abort;
  })

  return (
      <div>
          <h1>Verify</h1>
      </div>
  );
};

export default VerifyCode;
