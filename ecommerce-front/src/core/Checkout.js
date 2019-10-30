import React, { useState,useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getBraintreeClientToken, processPayment } from './apiCore'
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';

const Checkout = ({products}) =>{
  const [data, setData] = useState({
    loading: false,
    success:false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) =>{
    getBraintreeClientToken(userId, token).then(
      data=>{
        if(data.error){
          setData({...data,
          error: data.error})
        }else{
          setData({ clientToken: data.clientToken})
        }
      }
    )
  }
  useEffect(()=>{
    getToken(userId,token)
  }, [])

  const getTotal = () =>{
    return products.reduce((currentValue, nextValue)=>{
      return currentValue + (nextValue.count * nextValue.price)
    }, 0)
  }
  const showCheckout = () => (
    isAuthenticated()
      ? showDropIn()
      // <button className="btn btn-success">Checkout</button>
      : <Link>
          <button className="btn btn-primary">SignIn</button>
        </Link>
  )
  const buy = () =>{
    setData({loading:true})
    //send nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
      .then(data => {
        console.log(data);
        nonce = data.nonce;
        // once you have nonce e.g. card type, card num
        // send nonce as payment method to backend
        // total to be charged

        // console.log('send nonce and total to process:' , nonce, getTotal(products))

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        }

        processPayment(userId, token, paymentData)
        .then(response => {
          console.log(response);
          setData({...data, success: response.success});

          //empty cartUpdate


          //create order
        })
        .catch(error => console.log(error))
      })
      .catch(error => {
        console.log('dropin error: ', error)
        setData({...data, error: error.message})
        emptyCart(()=>{
          console.log('Payment success and refresh cart.')
          setData({loading:false})
        });
      })

  }
  const showDropIn = () => (
    <div onBlur={()=> setData({...data, error: ''})}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
            authorization: data.clientToken,
            paypal: {
              flow: 'vault'
            }
          }}
            onInstance={instance=>(data.instance = instance)}
        />
        <button onClick={buy} className="btn btn-success btn-block">Pay Amount</button>
        </div>
      ) : null }
    </div>
  )

  const showError = error =>{
    return(
      <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
      </div>
    )

  }

  const showSuccess = success =>{
    return(
      <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
        Congratulations! Your payment was successful.
        {success}
      </div>
    )

  }

  const showLoading = loading =>{
    return(
      <div className="alert alert-primary" style={{display: loading ? '' : 'none'}}>
        Loading...
      </div>
    )
  }
  return <div>
    {/* {JSON.stringify(products)} */}
    <h2>Total: ${getTotal()}</h2>
    {showError(data.error)}
    {showSuccess(data.success)}
    {showLoading(data.loading)}
    {showCheckout()}

  </div>

}
export default Checkout;
