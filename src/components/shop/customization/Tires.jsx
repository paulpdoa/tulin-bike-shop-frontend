import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';
import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';

const Tires = () => {

  const { setBikeDisplay,prodCode,setProdCode,setActive,frameSize,setBuild,setPreviousCode } = useContext(GlobalContext);


  const selectTire = (id,display,price,name,type,code,cardDisplay) => {
    const data = {id,display,price,name,type,cardDisplay};
    const prevData = { type,code };
    setBikeDisplay(display);
    setProdCode(code);
    setBuild(curr => [...curr,data]);
    setActive('seat');
    setPreviousCode(curr => [...curr,prevData]);
  }
  
  return (
    <>
        { products.products.map((product) => (
            product.forks.map(fork => (
                fork.shocks.map(shock => (
                    shock.wheels.map((wheel) => (
                        wheel.tires.filter(tire => tire.wheelCode === prodCode && tire.frameSize === frameSize).map(tire => (
                            <div className="cursor-pointer" key={tire.id} onClick={() => selectTire(tire.id,tire.display,tire.price,tire.name,tire.type,tire.tireCode,tire.cardDisplay)}>
                                <ChoiceCard image={tire.display} name={tire.name} price={tire.price} size={tire.frameSize} />
                            </div>
                        ))
                    ))
                ))
            ))
        ) ) }
    </>
  )
}

export default Tires