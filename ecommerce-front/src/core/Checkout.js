import React from 'react';
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const Checkout = ({products}) =>{
  const getTotal = () =>{
    return products.reduce((currentValue, nextValue)=>{
      return currentValue + (nextValue.count * nextValue.price)
    }, 0)
  }
  const showCheckout = () => (
    isAuthenticated()
      ? <button className="btn btn-success">Checkout</button>
      : <Link>
          <button className="btn btn-primary">SignIn</button>
        </Link>
  )
  return <div>
    {/* {JSON.stringify(products)} */}
    <h2>Total: ${getTotal()}</h2>
    {showCheckout()}

  </div>

}
export default Checkout;
