import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { FaUserShield } from 'react-icons/fa';

const VerifyCode = () => {
  const [code,setCode] = useState(0);
  const [error,setError] = useState('');  

  const [numone,setNumone] = useState('');  
  const [numtwo,setNumtwo] = useState('');  
  const [numthree,setNumthree] = useState('');  
  const [numfour,setNumfour] = useState('');  
  const [numfive,setNumfive] = useState('');  

  const [email,setEmail] = useState('');

  const { id } = useParams();
  
  useEffect(() => {
      const abortCont = new AbortController();

      axios.get(`/customer/${id}`)
      .then((data) => {
          setCode(data.data.code);
          setEmail(data.data.email);
      }).catch(err => console.log(err));

      return () => abortCont.abort;
  });

  const verifyAccount = () => {
    const codeInput = `${numone}${numtwo}${numthree}${numfour}${numfive}`;
    
    if(codeInput === code) {
        console.log('make the verify field to true')
    } else {
        console.log('The code entered was not matched, please check again');
    }

  }

  return (
      <>
        <Helmet><title>Tulin Bicycle Shop | Verify Account</title></Helmet>

        <div className="content h-screen">
            <div className="max-content flex items-center justify-center">
                <div className="bg-white shadow-2xl rounded w-1/2 h-auto p-10">
                    <section className="flex flex-col items-center">
                        <FaUserShield className="text-6xl text-center text-blue-500" />
                        <h1 className="text-4xl text-gray-800">Verify your account</h1>
                    </section>
                    <section className="flex flex-col gap-5 items-center mt-5">
                        <p className="text-center text-lg text-gray-800">Please confirm your account to verify and allow you to use the website. Ignoring this will disable you to use the store. The code was sent to { email }</p>
                        <form onSubmit={verifyAccount} className="flex gap-3">
                            <input className="verify-input" type="number" value={numone} onChange={(e) => setNumone(e.target.value)} />
                            <input className="verify-input" type="number" value={numtwo} onChange={(e) => setNumtwo(e.target.value)} />
                            <input className="verify-input" type="number" value={numthree} onChange={(e) => setNumthree(e.target.value)} />
                            <input className="verify-input" type="number" value={numfour} onChange={(e) => setNumfour(e.target.value)} />
                            <input onKeyPress={(e) => e.key === 'Enter' && verifyAccount() } className="verify-input" type="number" value={numfive} onChange={(e) => setNumfive(e.target.value)} />
                        </form>
                        <button onClick={verifyAccount} className="bg-green-500 p-2 rounded text-gray-100">Submit Code</button>
                    </section>
                </div>
            </div>
        </div>
      </>
  );
};

export default VerifyCode;
