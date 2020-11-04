import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { productAddCart, productRemoveCart, productDeleteCart } from "../action";
import Header from "./Header";

class Cart extends Component {

    handleClick = (id, action) => {
        if (action === "PRODUCT_REMOVE") {
            this.props.productRemoveCart(id);
        } else {
            this.props.productAddCart(id);
        }
    }

    handleRemove = (id) => {
        this.props.productDeleteCart(id)
    }

    handleCart = (data) => {
        if (data.addedItems.length > 0) {
            return data.addedItems.map((product, i) => (
                <div className="card mb-3" key={i}>
                    <div className="card-body card_product">
                        <div className="card_product_common d-flex">
                            <div className="card_product_image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="card_product_info">
                                <div className="card_product_title">
                                    {product.name}
                                </div>
                                <div className="product_price d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="product_price_actual font-weight-bold mr-2"><i className="fa fa-inr" aria-hidden="true"></i>{product.price.actual}</span>
                                        <span className="product_price_display font-weight-bold"><del>{product.price.display}</del></span>
                                    </div>
                                    <span className="product_price_discount font-weight-bold">{product.discount}% off</span>
                                </div>
                            </div>
                        </div>
                        <div className="card_product_common card_product_quantitybutton">
                            <button className="btn btn-round btn-transparent" onClick={() => this.handleClick(product.id, 'PRODUCT_REMOVE')}>-</button>
                            {product.quantity}
                            <button className="btn btn-round btn-transparent" onClick={() => this.handleClick(product.id, 'PRODUCT_ADD')}>+</button>
                        </div>
                        <div className="card_product_common card_product_remove">
                            <span onClick={() => this.handleRemove(product.id)}>REMOVE</span>
                        </div>
                    </div>
                </div>
            ))
        } else {
            return (<div className="card mb-3" key="1">
                <div className="card-body">
                    No Products Added
                </div>
            </div>
            )
        }
    }

    render() {
        const { products } = this.props;
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="cart_container container_common">
                        <div className="row cart_row">
                            <div className="col-9">
                                {this.handleCart(products)}
                            </div>
                            <div className="col-3">
                                <div className="card cart_box">
                                    <div className="card-header">
                                        Price Details
                                </div>
                                    <div className="card-body cart_pricing">
                                        <div className="cart_data">
                                            <span className="cart_label">Price ({products.totalProducts} item)</span>
                                            <span><i className="fa fa-inr"></i>{products.totalDisplay}</span>
                                        </div>
                                        <div className="cart_data">
                                            <span className="cart_label">Discount</span>
                                            <span><i className="fa fa-inr"></i>{products.totalDiscount}</span>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="cart_data">
                                            <span className="cart_label">Total Payable</span>
                                            <span><i className="fa fa-inr"></i>{products.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ productAddCart, productRemoveCart, productDeleteCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);