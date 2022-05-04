
const BikeBuilt = ({ itemId,products }) => {

  return (
    <div className="p-10 text-gray-100">
        { products.filter(product => itemId === product.id).map(product => (
          <img className="scale-150" src={product.display} alt="chosen parts" />
        )) }
    </div>
  )
}

export default BikeBuilt