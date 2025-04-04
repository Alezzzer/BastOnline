import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {

  const{getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email address'/>
        <input type="text" placeholder='Street'/>
        <div className='multi-fields'>
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input type="text" placeholder='Zip code'/>
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      
        
      <div className="cart-total">

      
              <h2>Cart Total</h2>
            
                <hr/>
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount()}</b>
                </div>
             
              <button >ORDER</button>

            </div>
      </div>

    </form>
  )
}

export default PlaceOrder