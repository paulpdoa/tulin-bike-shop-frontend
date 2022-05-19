import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const Frames = () => {

  const { setBikeDisplay,setActive,setProdCode,setFrameSize,setBuild,setPreviousCode } = useContext(GlobalContext);

  const selectFrame = (id,display,price,name,type,code,cardDisplay,size) => {
      const data = {id,display,price,name,type,cardDisplay};
      const prevData = {type,code};
      setActive('fork');    
      setBuild(currPart => [...currPart,data]);
      setBikeDisplay(display);
      setProdCode(code);
      setFrameSize(size);
      // push code to previous  
      setPreviousCode(curr => [...curr,prevData]);
  }
    
  return (
    <>
       { products.products.filter(product => product.type === 'frame').map(product => (
        <div className="cursor-pointer" key={product.id} onClick={() => selectFrame(product.id,product.display,product.price,product.name,product.type,product.frameCode,product.cardDisplay,product.frameSize)}>
            <ChoiceCard image={product.display} name={product.name} price={product.price} size={product.frameSize} />
        </div>
       )) }
    </>
  )
}

export default Frames