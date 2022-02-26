import { useState } from 'react';
import ChoiceCard from './ChoiceCard';

const CustomChoice = () => {

  const [items,setItems] = useState([
      {
          image: '/image/wheel.png',
          name: "wheel 1",
          price: "123 php"
      },
      {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    },
    {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    },
    {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    },
    {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    },
    {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    },
    {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    },
    {
        image: '/image/wheel.png',
        name: "wheel 1",
        price: "123 php"
    }
  ])  

  return (
    <div className="p-20 flex justify-center items-center">   
        <div className="flex overflow-hidden gap-3 bg-blue-200 w-full h-auto">
            <h1>Make slider</h1>
            { items && items.map((item,key) => (
                <div key={key}>
                    <ChoiceCard image={item.image} name={item.name} price={item.price} />
                </div>
            )) }
        </div>
    </div>
  )
}

export default CustomChoice