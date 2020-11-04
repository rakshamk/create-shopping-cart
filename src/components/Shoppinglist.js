import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProducts, productAddCart } from "../action";
import Loader from "./Loader";

class ShoppingList extends Component {

    componentDidMount() {
        if (this.props.products.list.length === 0)
            this.props.getProducts();
    }

    handleClick = (event, id) => {
        event.preventDefault();
        this.props.productAddCart(id);
    }

    productList = (data) => {
        if (data.list.length > 0) {
            return data.list.map((product) => (
                <div className="card product_card" key={product.id}>
                    <div className="card-body product_body">
                        <div className="product_image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product_name text-truncate">
                            {product.name}
                        </div>
                        <div className="product_price d-flex justify-content-between align-items-center">
                            <div>
                                <span className="product_price_actual font-weight-bold mr-2"><i className="fa fa-inr" aria-hidden="true"></i>{product.price.actual}</span>
                                <span className="product_price_display font-weight-bold"><del>{product.price.display}</del></span>
                            </div>
                            <span className="product_price_discount font-weight-bold">{product.discount}% off</span>
                        </div>
                        <button className="btn btn-yellow mt-2" onClick={(e) => this.handleClick(e, product.id)}>Add to Cart</button>
                    </div>
                </div>
            ))
        } else if (data.length === 0 && !data.dataLoading) {
            return (<div className="col-12">
                <div className="card" key="1">
                    <div className="card-body">
                        No Produts, change filters and try again.
                </div>
                </div>
            </div>)
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 product">
                    {this.productList(this.props.products)}
                    {this.props.products.dataLoading ?
                        <Loader />
                        : ""}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProducts, productAddCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);