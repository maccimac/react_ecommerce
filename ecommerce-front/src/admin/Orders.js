import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () =>{
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
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

  const loadStatusValues = () =>{
    getStatusValues(user._id, token).then(data => {
        if(data.error){
          console.log(data.error)
        } else {
          setStatusValues(data)
        }
      })
  }

  useEffect(()=>{
    loadOrders();
    loadStatusValues();
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

  const showInput = (key, value) =>(
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly/>
    </div>
  )

  const handleStatusChange = (e,orderId) =>{
    updateOrderStatus(user._id, token, orderId, e.target.value)
      .then(data=>{
        if(data.error){
          console.log('Status update failed')
        } else {
          loadOrders();
        }
      })
  }

  const showStatus = (o) =>(
    <div className="form-group">
      <h5 className="mark mb-4">
        Status: {o.status}
      </h5>
      <select name="" id="" className="form-control" onChange={ e =>{
        handleStatusChange(e, o._id)
      }}>
        <option value="">Update Status</option>
        {statusValues.map((val,index)=>(
          <option key={index} value={val}>{val}</option>
        ))}

      </select>
    </div>
  )

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
                    {showStatus(o)}


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
                {o.products.map((p, pIndex)=>(
                  <div className="mb-3 p-2" style={{border:"1px solid #ccc"}}>
                    {showInput('Name', p.name)}
                    {showInput('Price', p.price)}
                    {showInput('Total', p.count)}
                    {showInput('ID', p._id)}
                  </div>
                ))}

              </div>
            )

          })}
        </div>

      </div>

    </Layout>
  )

}

export default Orders
