import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';

const Frames = ({ setActive,setItemId,setBuild,setProdCode }) => {

    const selectFrame = (id,display,price,name,type,code) => {
        const data = {display,price,name,type};
        setProdCode(code);
        setActive('fork');    
        setItemId(id);
        setBuild(currPart => [...currPart,data]);
    }
    
  return (
    <>
       { products.products.filter(product => product.type === 'frame').map(product => (
        <div className="cursor-pointer" key={product.id} onClick={() => selectFrame(product.id,product.display,product.price,product.name,product.type,product.prodCode)}>
            <ChoiceCard image={product.display} name={product.name} price={product.price} />
        </div>
       )) }
    </>
  )
}

export default Frames