import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';
import { GlobalContext } from '../../../helper/Context';
import { useContext } from 'react';

const Forks = () => {

  const { setBikeDisplay,setActive,prodCode,setProdCode,frameSize,setBuild } = useContext(GlobalContext);

    const selectFork = (id,display,price,name,type,code,cardDisplay) => {
        const data = {id,display,price,name,type,cardDisplay};
        setActive('shock');
        setBuild(currPart => [...currPart,data]);
        setBikeDisplay(display);
        setProdCode(code);
    }

  return (
    <>
     { products.products.map((product) => (
       product.forks.filter(fork => fork.frameCode === prodCode && fork.frameSize === frameSize).map(fork => (
        <div className="cursor-pointer" key={fork.id} onClick={() => selectFork(fork.id,fork.display,fork.price,fork.name,fork.type,fork.forkCode,fork.cardDisplay)}>
            <ChoiceCard image={fork.cardDisplay} name={fork.name} price={fork.price} size={fork.frameSize} />
        </div>
       ))
     ) ) }
    </>
  )
}

export default Forks