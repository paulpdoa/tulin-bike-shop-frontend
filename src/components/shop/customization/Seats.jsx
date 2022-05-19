import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';
import { GlobalContext } from '../../../helper/Context';
import { useContext } from 'react';

const Seats = () => {

    const { setBikeDisplay,setActive,prodCode,setProdCode,frameSize,setBuild,setPreviousCode } = useContext(GlobalContext);

    const selectSeat = (id,display,price,name,type,code,cardDisplay) => {
        const data = {id,display,price,name,type,cardDisplay};
        const prevData = { type,code };
        setProdCode(code);
        setActive('groupset');
        setBikeDisplay(display);
        setBuild(curr => [...curr,data]);
        setPreviousCode(curr => [...curr,prevData]);
      }

  return (
    <>
        { products.products.map((product) => (
            product.forks.map(fork => (
                fork.shocks.map(shock => (
                    shock.wheels.map((wheel) => (
                        wheel.tires.map(tire => (
                            tire.seatSaddles.filter(seatSaddle => seatSaddle.tireCode === prodCode && seatSaddle.frameSize === frameSize).map(seatSaddle => (
                                <div className="cursor-pointer" key={seatSaddle.id} onClick={() => selectSeat(seatSaddle.id,seatSaddle.display,seatSaddle.price,seatSaddle.name,seatSaddle.type,seatSaddle.seatCode,seatSaddle.cardDisplay)}>
                                    <ChoiceCard image={seatSaddle.display} name={seatSaddle.name} price={seatSaddle.price} size={seatSaddle.frameSize} />
                                </div>
                            ))
                        ))
                    ))
                ))
            ))
        ) ) }
    </>
  )
}

export default Seats