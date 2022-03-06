const Drink = ({ drink }) => (
  <>
    <span className='flex justify-center'>
      { drink.name }
    </span>
    <span className='flex justify-center'>
      { drink.alcohol }
    </span>
    <span className='flex justify-center'>
      { drink.ingredients[0] }, ...
    </span>
    <span className='flex justify-center'>
      { drink.price } €
    </span>
  </>
)
export default Drink;