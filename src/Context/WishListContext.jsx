import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserTokencontext } from "./UserTokenContext";

const headers = {
    token: window.localStorage.getItem("token")
}
const x = {
    wishList: window.localStorage.getItem("wishId")
}
const y = {
    count: window.localStorage.getItem("count")
}

export let WishListContext = createContext();

async function addProductToWish(productId) {




    return axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }

    )
        .then(res => {
            localStorage.setItem("wishId", res.data.data)
            return res
        })
        .catch(err => err)
}


async function removeWishProduct(id) {
    return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id} `,
        { headers }
    )
        .then(res => res.data)
        .catch(err => err.response.data)

}



async function getWishList() {
    return axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }

    )
        .then(res => {
            localStorage.setItem("wishId", res.data.data.map(a => a._id))
            return res.data
        })
        .catch(err => err.data)
}





export default function WishListContextProvider({ children }) {

    let [wished, setWished] = useState([])
    let tokenContext = useContext(UserTokencontext)

    useEffect(() => {
        if (localStorage.getItem("wishId")) {
            setWished(localStorage.getItem("wishId"))
        } 
    })



    return <WishListContext.Provider value={{ addProductToWish, getWishList, removeWishProduct, wished, setWished }}>
        {children}
    </WishListContext.Provider>
}