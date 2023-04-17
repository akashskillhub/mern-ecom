import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import { useFormik } from "formik"
import * as yup from "yup"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, readProducts, updateProduct } from '../../redux/admin/adminActions'
import { invalidate } from '../../redux/admin/adminSlice'

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import ReactHtmlParser from "react-html-parser"

const Products = () => {
    const [show, setShow] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const { productAdded, error } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    useEffect(() => {
        if (productAdded || error) {
            setTimeout(() => {
                dispatch(invalidate())
                dispatch(readProducts())
            }, 1500)
        }
    }, [productAdded, error])

    return <>
        <div className="container">
            {
                productAdded && <div class="alert alert-success">Product Added Success
                </div>
            }
            {
                error && <div class="alert alert-danger">{error}</div>
            }
        </div>
        <div className="text-end container mb-5">
            <button
                data-bs-toggle="modal"
                data-bs-target="#addProduct"
                type="button"
                class="btn btn-primary">+ Add Product</button>
        </div>
        <Grid
            col1={<ProductList setSelectedProduct={setSelectedProduct} />}
            col2={<ProductDetails
                setShow={setShow}
                selectedProduct={selectedProduct}
            />}
            col3={<ProductEdit
                show={show}
                setShow={setShow}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct} />}
        />

        <AddProduct />

    </>
}
const ProductList = ({ setSelectedProduct }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(readProducts())
    }, [])
    const { products } = useSelector(state => state.admin)
    const content = products && products.map(item => <>
        <div
            class="col-sm-12 mb-4"
            onClick={e => setSelectedProduct(item)}>
            <ProductCard product={item} />
        </div>
    </>
    )

    return <>
        <div className="container">
            <div className="row">
                {content}
            </div>
        </div>
    </>
}
const ProductCard = ({ product }) => {
    return <>
        {product.images[0]}
        <div class="card p-4">
            <img src={product.images[0]} class="img-fluid" alt="" />
            <div class="card-body">
                <h6>{product.name}</h6>
                <div>{ReactHtmlParser(product.desc.substring(1, 100))}</div>
                <p>
                    Starting From
                    <strong>${product.price}/-</strong>
                </p>
            </div>
        </div>
    </>
}
const ProductDetails = ({ selectedProduct, setShow }) => {
    return selectedProduct && <div className='card'>
        <div className="card-body">
            <div className='text-end'>
                <button
                    type="button"
                    onClick={e => setShow(true)}
                    class="btn btn-warning mb-5 ">
                    Edit
                </button>
            </div>
            {
                <>
                    <h1>{selectedProduct.name}</h1>
                    <div>{ReactHtmlParser(selectedProduct.desc)}</div>
                    <p>{selectedProduct.price}</p>

                </>
            }
        </div>
    </div>
}
const ProductEdit = ({ selectedProduct, setSelectedProduct, show, setShow }) => {
    const dispatch = useDispatch()
    const { update, error, loading } = useSelector(state => state.admin)
    const handleUpdateProduct = e => {
        dispatch(updateProduct(selectedProduct))
    }
    useEffect(() => {
        if (update) {
            dispatch(readProducts())
            setTimeout(() => {
                dispatch(invalidate())
                setSelectedProduct(null)
                setShow(false)
            }, 1500);
        }
    }, [update])
    if (update) {
        return <div class="alert alert-success">Update Success
        </div>
    }
    if (loading) {
        return <div class="alert alert-primary">
            Updating....
            <div class="spinner-border text-primary"></div>
        </div>
    }
    return selectedProduct && show && <>
        <div className="card">
            <div className="card-body">
                <div class="form-check form-switch">
                    <input
                        checked={selectedProduct.publish}
                        onChange={e => setSelectedProduct({
                            ...selectedProduct,
                            publish: e.target.checked
                        })}
                        class="form-check-input" type="checkbox" id="publish" />
                    <label class="form-check-label" for="publish">Publish</label>
                </div> <br />
                <div class="form-check form-switch">
                    <input
                        checked={selectedProduct.available}
                        onChange={e => setSelectedProduct({
                            ...selectedProduct,
                            available: e.target.checked
                        })}
                        class="form-check-input" type="checkbox" id="available" />
                    <label class="form-check-label" for="available">Available</label>
                </div><br />

                <input
                    type="text"
                    className='form-control'
                    onChange={e => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    value={selectedProduct.name} /> <br />

                <input
                    type="text"
                    className='form-control'
                    onChange={e => setSelectedProduct({ ...selectedProduct, desc: e.target.value })}
                    value={selectedProduct.desc} /> <br />
                <input
                    type="text"
                    className='form-control'
                    onChange={e => setSelectedProduct({ ...selectedProduct, images: e.target.value })}
                    value={selectedProduct.images[0]} /> <br />
                <input
                    type="text"
                    className='form-control'
                    onChange={e => setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value
                    })}
                    value={selectedProduct.price} /> <br />
                <button onClick={handleUpdateProduct} type="button" class="btn btn-primary w-100 btn-lg">Update Product</button>
            </div>
        </div>

    </>
}

const AddProduct = () => {
    const [preview, setPreview] = useState([])
    const [images, setImages] = useState([])
    const [desc, setDesc] = useState("")
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: "ASUS Core i9 12th Gen",

            price: 192440,
            images: "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/i/3/2/vivobook-pro-16x-gaming-laptop-asus-original-imagnwe9h5zyfaje.jpeg?q=70"
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            stock: yup.string().required(),
            price: yup.string().required(),
            images: yup.string().required(),
        }),
        onSubmit: values => {
            if (images.length > 0) {

                const fd = new FormData()
                fd.append("name", values.name)
                fd.append("desc", desc)
                fd.append("stock", values.stock)
                fd.append("price", values.price)
                for (let i = 0; i < images.length; i++) {
                    fd.append("images", images[i])
                }
                dispatch(addProduct(fd))
            } else {
                console.log("Please Choose Image")
            }
        }
    })

    const handleChange = e => {
        const images = e.target.files
        setImages(images)
        let allPreview = []
        for (let i = 0; i < images.length; i++) {
            allPreview.push(URL.createObjectURL(images[i]))
        }
        setPreview(allPreview)
    }

    return <>
        <form onSubmit={formik.handleSubmit} >
            <div class="modal fade " id="addProduct" >
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <pre>
                                {JSON.stringify(formik.errors, null, 2)}
                            </pre>
                            <div className='my-3'>
                                <label for="name" class="form-label">Product Name</label>
                                <input
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    className={`
                                            form-control  
                                            ${formik.touched.name && (formik.errors.name ? "is-invalid" : "is-valid")
                                        }
                                    `}
                                    placeholder="Enter Product Name" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <pre>
                                {JSON.stringify(desc, null, 2)}
                            </pre>
                            <div className='my-3'>
                                <ReactQuill
                                    theme='snow'
                                    value={desc}
                                    onChange={setDesc}
                                />
                            </div>
                            <div className='my-3'>
                                <label for="name" class="form-label">Product Price</label>
                                <input
                                    {...formik.getFieldProps("price")}
                                    type="number"
                                    className={`
                                    form-control  
                                    ${formik.touched.price && (formik.errors.price ? "is-invalid" : "is-valid")
                                        }
                            `}
                                    placeholder="Enter Product Price" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-3'>
                                <label for="name" class="form-label">Product Stock</label>
                                <input
                                    {...formik.getFieldProps("stock")}
                                    type="number"
                                    className={`
                                    form-control  
                                    ${formik.touched.stock && (formik.errors.stock ? "is-invalid" : "is-valid")
                                        }
                            `}
                                    placeholder="Enter Product Stock" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-3'>
                                <label for="name" class="form-label">Product Images</label>
                                <input
                                    onChange={handleChange}
                                    type="file"
                                    multiple={true}
                                    className="form-control"
                                    placeholder="Enter Product Stock" />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div>
                                {
                                    preview.map(url => <img
                                        key={url}
                                        className='img-fluid mx-3'
                                        src={url}
                                        alt={url}
                                        width={100} />)
                                }
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="submit"
                                class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    </>
}

export default Products