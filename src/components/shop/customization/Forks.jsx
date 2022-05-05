import products from '../../../json/products.json';
import ChoiceCard from './ChoiceCard';

const Forks = ({ setActive,setItemId,setBuild,prodCode }) => {

    const selectFork = (id,display,price,name,type) => {
        const data = {display,price,name,type};
        setActive('wheels & tires');
        setItemId(id);
        setBuild(currPart => [...currPart,data]);
    }

  return (
    <>
       { products.products.filter(product => product.type === 'fork' && product.prodCode === prodCode).map(product => (
        <div className="cursor-pointer" key={product.id} onClick={() => selectFork(product.id,product.display,product.price,product.name,product.type)}>
            <ChoiceCard image={product.display} name={product.name} price={product.price} />
            {console.log(product.prodCode)}
        </div>
       )) }
    </>
  )
}

export default Forks