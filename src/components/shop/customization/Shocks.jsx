import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const Shocks = () => {

    const { setBikeDisplay,setActive,prodCode,setProdCode,frameSize,setBuild } = useContext(GlobalContext);

    const selectShock = (id,display,price,name,type,code,cardDisplay) => {
        const data = {id,display,price,name,type,cardDisplay};
        setBikeDisplay(display);
        setActive('wheels')
        setProdCode(code);
        setBuild(curr => [...curr,data])
    }
    

  return (
    <>
        { products.products.map((product) => (
            product.forks.map(fork => (
            fork.shocks.filter(shock => shock.forkCode === prodCode && shock.frameSize === frameSize).map(shock => (
                <div className="cursor-pointer" key={shock.id} onClick={() => selectShock(shock.id,shock.display,shock.price,shock.name,shock.type,shock.shockCode,shock.cardDisplay)}>
                    <ChoiceCard image={shock.cardDisplay} name={shock.name} price={shock.price} size={shock.frameSize} />
                </div>
            ))
        ))
     ) ) }
    </>
  )
}

export default Shocks