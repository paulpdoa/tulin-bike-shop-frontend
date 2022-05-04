import ChoiceCard from './ChoiceCard';

const CustomChoice = ({ setItemId,products }) => {
   
  return (
    <div className="p-20 flex justify-center items-center">   
        <div className="flex overflow-hidden gap-3 w-full h-auto">
            { products && products.map((item,key) => (
                <div key={key} onClick={() => setItemId(item.id)}>
                    <ChoiceCard image={item.display} />
                </div>
            )) }
        </div>
    </div>
  )
}

export default CustomChoice;