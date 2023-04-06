import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, updateOrderStatus } from '../../redux/admin/adminActions'
import { invalidate } from '../../redux/admin/adminSlice'

const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState()
    return <>
        <Grid
            col1={<OrderList setSelectedOrder={setSelectedOrder} />}
            col2={<Details selectedOrder={selectedOrder} />}
            col3={<EditOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />} />
    </>
}
const OrderList = ({ setSelectedOrder }) => {
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getOrders())
    }, [])
    // const orders = []
    // for (let i = 1; i <= 10; i++) {
    //     orders.push({
    //         id: 45 + i,
    //         user: { id: 1, name: "john", email: "john@gmail.com" },
    //         products: [
    //             { id: 11, name: "laptop", qty: 1, price: 45000 },
    //             { id: 22, name: "mouse", qty: 2, price: 2500 },
    //         ],
    //         total: 50000 + (i * i),
    //         delivered: false,
    //         status: "dispatch"
    //     })
    // }
    const content = orders && orders.map(item => <li class="list-group-item d-flex justify-content-between">
        <span>{item.userId}</span>
        <span>{item.total}</span>
        <span>{item.status}</span>
        <button
            onClick={e => setSelectedOrder(item)}
            type="button"
            class="btn btn-sm btn-primary">Details</button>
    </li>)

    return <div class="card">
        <div className="card-header">Orders</div>
        <div class="card-body">
            <ul class="list-group">
                <li className='list-group-item'>
                    <input type="text" className='form-control' placeholder='search order' />
                </li>
                {content}
            </ul>
        </div>
    </div>
}
const Details = ({ selectedOrder }) => {
    return <>
        {
            selectedOrder && <div class="card">
                <div class="card-header d-flex justify-content-between">
                    Order Detail
                    <button
                        type="button"
                        class="btn btn-warning btn-sm">
                        edit</button>
                </div>
                <div class="card-body">
                    <h1>Order Id  {selectedOrder.id} </h1>
                    <h6>Status  {selectedOrder.status} </h6>
                    <h6>Delivered   {selectedOrder.delivered ? "yes" : "no"}</h6>
                    <h6>Name   {selectedOrder.userId}</h6>

                    {
                        selectedOrder.products.map(item => {
                            return <>
                                <img src={item.images[0]} width={50} alt="" />
                                <p>Name {item.name}</p>
                                <p>Qty {item.qty}</p>
                            </>
                        })
                    }

                </div>
            </div>
        }
    </>
}
const EditOrder = ({ selectedOrder, setSelectedOrder }) => {
    const [status, setStatus] = useState("Transit")
    const dispatch = useDispatch()
    const { statusUpdate, orders } = useSelector(state => state.admin)
    useEffect(() => {
        if (statusUpdate) {
            dispatch(getOrders())
            setTimeout(() => {
                dispatch(invalidate())
            }, 2000);
        }
    }, [statusUpdate])

    useEffect(() => {
        if (orders && selectedOrder) {
            const x = orders.find(item => item.id === selectedOrder.id)
            setSelectedOrder(x)
        }
    }, [orders])
    return <>
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                Edit Order
                <button
                    type="button"
                    class="btn btn-outline-danger">
                    Cancel Order
                </button>
            </div>
            <div class="card-body">
                <select
                    className='form-control'
                    value={status}
                    onChange={e => setStatus(e.target.value)}>
                    <option value="Transit">Transit</option>
                    <option value="Dispatch">Dispatch</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <br />
                <button
                    type="button"
                    onClick={e => dispatch(updateOrderStatus({
                        id: selectedOrder.id,
                        status
                    }))}
                    class="btn btn-primary w-100">
                    Change Status
                </button>


            </div>
        </div>
    </>
}
export default Orders