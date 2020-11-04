import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartIcon extends Component {
    render() {
        const { products } = this.props;
        return (
            <Link to="/cart" className="header_cart">
                {products.totalProducts > 0 ? <div className="header_count">{products.totalProducts}</div> : ''}
                <i className="fa fa-shopping-cart header_icon" aria-hidden="true"></i>
            </Link>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, null)(CartIcon);