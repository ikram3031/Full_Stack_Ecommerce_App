import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { loadStripe } from "@stripe/stripe-js";
// import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";

const Cart = () => {
    return (
        <div className="cart-panel">
            <div className="opac-layer"></div>
        </div>
    );
};

export default Cart;
