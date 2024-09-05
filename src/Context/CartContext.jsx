import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserTokencontext } from "./UserTokenContext";


const headers = {
    token: window.localStorage.getItem("token")
}


export let CartContext = createContext();



async function cashOnDelivery(cartId, shippingAddress) {
    return axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId} `,
        { shippingAddress },
        { headers }

    )
        .then(res => res)
        .catch(err => err)
}



async function removeProduct(id) {
    return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id} `,
        { headers }
    )
        .then(res => {
            localStorage.setItem("count", res.data.numOfCartItems)
            
            return res.data
        })
        .catch(err => err.response.data)

}


async function updateProductCount(id, count) {
    return axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id} `,
        { count },
        { headers }
    )
        .then(res => res.data)
        .catch(err => err.response.data)

}


async function clearUserCart() {
    return axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }

    )
        .then(res => {
            localStorage.setItem("count", res.data.numOfCartItems)
            
            return res.data
        })
        .catch(err => err.response.data)
}


async function getCart() {
    return axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart ",
        { headers }

    )
        .then(res => res.data)
        .catch(err => err.response.data)
}


async function addProductToCart(productId) {
    return axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart ",
        { productId },
        { headers }

    )
        .then(res => {
            localStorage.setItem("count", res.data.numOfCartItems)
           
            return res
        })
        .catch(err => err)
}


export default function CartContextProvider({ children }) {
    let [cartId, setCartId] = useState(null)
    let [count, setCount] = useState(null)

    useEffect(() => {
        const headers = {
            token: window.localStorage.getItem("token")
        } 
      }, [])


    return <CartContext.Provider value={{ addProductToCart, getCart, removeProduct, updateProductCount, clearUserCart, cashOnDelivery, cartId, setCartId, count, setCount }}>
        {children}
    </CartContext.Provider>
}