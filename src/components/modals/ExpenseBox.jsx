import { useState,useContext } from 'react';
import { GlobalContext } from '../../helper/Context';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

const ExpenseBox = ({ setShowExpenseBox }) => {
  
  const [amount,setAmount] = useState(0);
  const { setShowAlert,setAlertMssg } = useContext(GlobalContext); 

  const submitAmountExpense = async(e) => {
      e.preventDefault();
      try {
        const data = await axios.post('/expense',{ amount });
        setAlertMssg(data.data.mssg);
        setShowAlert(true);
        setShowExpenseBox(data.data.closeModal);
      }
      catch(err) {
          console.log(err);
      }
  }

  
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 h-full w-full bg-gray-800 bg-opacity-30">
        <div className="bg-gray-100 text-gray-800 rounded shadow-lg p-2 z-50 w-1/2">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl">Add Monthly Expense</h1>
                <button onClick={() => setShowExpenseBox(false)} className="text-2xl group"><AiOutlineClose className='group-hover:scale-150 transition duration-300'/></button>
            </div>
            <form onSubmit={submitAmountExpense}> 
                <div className="flex flex-col">
                    <label htmlFor="amount">Amount:</label>
                    <input onChange={(e) => setAmount(e.target.value)} value={amount} className="outline-none p-2 rounded border border-gray-300" placeholder="Enter total amount" type="number" required />
                </div><br/>
                <button className="bg-green-500 text-gray-100 p-2 rounded float-right">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ExpenseBox