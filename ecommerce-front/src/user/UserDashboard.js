import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { read, update, updateUser, getPurchaseHistory } from './apiUser';

const Dashboard = () => {
  const [history, setHistory] = useState([])

  const {
    user: {_id, name, email, role}
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) =>{
    getPurchaseHistory(userId, token).then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        setHistory(data)
      }
    })
  }

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">My Cart</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={"/user/profile/" + _id}>Update Profile </Link>
          </li>
        </ul>
      </div>
    )
  }
  const userInfo = () => (
    <div className="card mb-5">
      <h4 className="card-header">User Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          {name}
        </li>
        <li className="list-group-item">
          {email}
        </li>
        <li className="list-group-item">
          {role == 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  // const purchaseHistory = () => (
  //   <div className="card mb-5">
  //     <h4 className="card-header">Purchase History</h4>
  //     <ul className="list-group">
  //       <li className="list-group-item">
  //         12342
  //       </li>
  //     </ul>
  //
  //   </div>
  // )


  const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {

                        return (
                            <div>
                                <hr />
                                <h5>
                                    Purchased {" "}
                                    {moment(h.createdAt).fromNow()}
                                </h5>
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>Product price: ${p.price}</h6>
                                        </div>
                                    );
                                })}
                                <p>
                                  Purchased by {h.user.name}.
                                </p>
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

  useEffect(()=>{
    init(_id, token);
  },[])


  return(
    <Layout title="User Dashboard" description={"Good day, " + name} className="container">
      <div className="row">
        <div className="col-lg-3">
          {userLinks()}
        </div>
        <div className="col-lg-9">
          {userInfo()}
           {purchaseHistory(history)}
          {JSON.stringify(history)}
        </div>
      </div>




    </Layout>
  )
};

export default Dashboard;
