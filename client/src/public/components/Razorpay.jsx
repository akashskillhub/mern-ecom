import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyPaymentAction } from '../../redux/user/userActions'
import { emptyCart } from '../../redux/public/publicSlice'
import { useNavigate } from 'react-router-dom'

const Razorpay = ({ desc }) => {
    const { orderId, paymentVerify } = useSelector(state => state.user)
    const { cart, total } = useSelector(state => state.public)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (paymentVerify) {
            dispatch(emptyCart())
            navigate("/payment-success")
        }
    }, [paymentVerify])
    useEffect(() => {
        if (orderId) {
            const Razor = new window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: total * 100,
                currency: "INR",
                description: desc,
                order_id: orderId,
                prefill: {
                    contact: 9284123374
                },
                image: "https://skillhubitsolution.com/assets/img/900x450/img155.jpg",
                handler: response => {
                    console.log(response)
                    const cartItems = cart.map(item => {
                        return {
                            product: item._id,
                            qty: item.qty
                        }
                    })
                    dispatch(verifyPaymentAction({ ...response, cartItems }))
                }
            })
            Razor.open()
        }
    }, [orderId])
    return <>

    </>
}

export default Razorpay