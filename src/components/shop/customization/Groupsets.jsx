import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';
import { GlobalContext } from '../../../helper/Context';
import { useContext } from 'react';

const Groupsets = () => {

    const { setBikeDisplay,prodCode,frameSize,setBuild,setShowSelectedParts } = useContext(GlobalContext);

    const selectGroupset = (id,display,price,name,type,code,cardDisplay) => {
        const data = {id,display,price,name,type,cardDisplay};
        setBikeDisplay(display);
        setBuild(curr => [...curr,data]);
        setShowSelectedParts(true);
      }

  return (
    <>
        { products.products.map((product) => (
            product.forks.map(fork => (
                fork.shocks.map(shock => (
                    shock.wheels.map((wheel) => (
                        wheel.tires.map(tire => (
                            tire.seatSaddles.map(seatSaddle => (
                                seatSaddle.groupsets.filter(groupset => groupset.seatCode === prodCode && groupset.frameSize === frameSize).map(groupset => (
                                    <div className="cursor-pointer" key={groupset.id} onClick={() => selectGroupset(groupset.id,groupset.display,groupset.price,groupset.name,groupset.type,groupset.seatCode,groupset.cardDisplay)}>
                                        <ChoiceCard image={groupset.display} name={groupset.name} price={groupset.price} size={groupset.frameSize} />
                                    </div>
                                ))
                            ))
                        ))
                    ))
                ))
            ))
        ) ) }
    </>
  )
}

export default Groupsets