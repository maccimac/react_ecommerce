import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = () =>{
  const [orders, setOrders] = useState([]);
  const {user, token} = isAuthenticated();
  const loadOrders = () =>{
    listOrders(user._id, token).then(data => {
        if(data.error){
          console.log(data.error)
        } else {
          setOrders(data)
        }
      })
  }

  useEffect(()=>{
    loadOrders()
  }, [])

  // const noOrder = orders = {
  //   return  orders.length < 1 ? <h4>No orders</h4> : null;
  //
  // }
  const showOrdersLength = () =>{
    if(orders.length>0){
      return (
        <h1>
          Total orders: {orders.length}
        </h1>
      )
    } else {
      return(
        <h1 className="text-danger">
          No orders
        </h1>
      )
    }
  }

  return (
    <Layout title="Orders" classNae="container">
      <div className="row">

        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {/* {noOrder(orders)} */}
          {orders.map((o, oIndex) => {
            return(
              <div className="mt-5" key={oIndex} style={{borderBottom: "5px solid #ccc"}}>
                <h3 className="mb-3">
                  <span>
                    Order ID: {o._id}
                  </span>
                </h3>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    {o.status}
                  </li>
                  <li className="list-group-item">
                    {o.transaction_id}
                  </li>
                  <li className="list-group-item">
                    {o.amount}
                  </li>
                  <li className="list-group-item">
                    {o.user.name}
                  </li>
                  <li className="list-group-item">
                    {o.address}
                  </li>
                  <li className="list-group-item">
                    {moment(o.createdAt).fromNow()}
                  </li>
                </ul>

                <h4 className="my-4">
                  Total products in order: {o.products.length}
                </h4>

              </div>
            )

          })}
        </div>

      </div>

    </Layout>
  )

}

export default Orders
