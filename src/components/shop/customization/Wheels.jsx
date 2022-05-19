import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';
import { useContext } from 'react';
import { GlobalContext } from '../../../helper/Context';

const Wheels = () => {

    const { setBikeDisplay,prodCode,setProdCode,setActive,frameSize,setBuild,setPreviousCode } = useContext(GlobalContext);

    const selectWheel = (id,display,price,name,type,code,cardDisplay) => {
        const data = {id,display,price,name,type,cardDisplay};
        const prevData = { type,code };
        setBikeDisplay(display);
        setProdCode(code);
        setActive('tire')
        setBuild(curr => [...curr,data]);
        setPreviousCode(curr => [...curr,prevData]);
    }
    
  return (
    <>
        { products.products.map((product) => (
            product.forks.map(fork => (
                fork.shocks.map(shock => (
                    shock.wheels.filter(wheel => wheel.shockCode === prodCode && wheel.frameSize === frameSize).map((wheel) => (
                        <div className="cursor-pointer" key={wheel.id} onClick={() => selectWheel(wheel.id,wheel.display,wheel.price,wheel.name,wheel.type,wheel.wheelCode,wheel.cardDisplay)}>
                            <ChoiceCard image={wheel.display} name={wheel.name} price={wheel.price} size={wheel.frameSize} />
                        </div>
                    ))
                ))
            ))
        ) ) }
    </>
  )
}

export default Wheels