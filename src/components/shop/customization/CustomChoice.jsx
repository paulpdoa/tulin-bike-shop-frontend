import ChoiceCard from './ChoiceCard';

const CustomChoice = ({ setItemId,products,active,setBuild,setProdCode,prodCode }) => {

  const sendBike = (id,display,name,price,code) => {
    const selectedPart = {
      id,
      display,
      name,
      price
    }
    setItemId(id)
    setProdCode(code);
    setBuild(current => [...current,selectedPart])
  }

  console.log(prodCode);

  return (
    <div className="p-10 flex justify-center items-center fixed bottom-0 bg-white w-full bg-opacity-50">   
        <div className="flex overflow-hidden gap-3 w-full h-auto">
            { products && products.filter(product => {
              if(prodCode === '') {
                return product.type === active
              } else {
                return product.prodCode === prodCode && product.type === active
              }
            }).map((item,key) => (
                <div className="cursor-pointer" key={key} onClick={() => sendBike(item.id,item.display,item.name,item.price,item.prodCode)}>
                    <ChoiceCard image={item.display} name={item.name} price={item.price} />
                </div>
            )) }
        </div>
    </div>
  )
}

export default CustomChoice;