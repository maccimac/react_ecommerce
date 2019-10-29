import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({product, showViewProductBtn=true, showAddToCartBtn=false}) => {
  const showViewBtn = (showViewProductBtn) =>{
    return(
      showViewProductBtn && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary my-2 mr-2">
            View Product
          </button>
        </Link>
      )
    )
  }
  const showCartBtn = (showAddToCartBtn) =>{
    return(
      showAddToCartBtn && (
        <Link to="/">
          <button className="btn btn-outline-success my-2">
            Add to cart
          </button>
        </Link>
      )
    )
  }
  const showStock = (quantity) => {
    return quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span className="badge badge-primary badge-pill">Out of Stock</span>;
  }
  return (
    // <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="product"/>
          <p className="lead mt-2">{product.description.substring(0,100)}</p>
          <p className="black-9">${product.price}</p>
          <p className="black-8">Category: {product.category && product.category.name}</p>
          <p className="black-8">
            Added on
             {moment(product.createdAt).fromNow()}
          </p>

              {showViewBtn(showViewProductBtn)}
              {showCartBtn(showAddToCartBtn)}
              <br/>
              {showStock()}




        </div>
      </div>
    // </div>
  )
}

export default Card;
