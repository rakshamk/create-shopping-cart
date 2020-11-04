import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, } from "redux";
import { productsRangeListing, productsRangeListingUpdate } from "../action";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

class Filter extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = value => {
        if (value.min >= 0 && value.max <= 100000)
            this.props.productsRangeListingUpdate(value);
    }

    submitFilter = event => {
        event.preventDefault();
        const { value } = this.props.products;
        this.props.productsRangeListing(value);
    }

    render() {
        // const { value } = this.state;
        const { products } = this.props;
        return (
            <div className="filter">
                <div className="filter_title">Filters</div>
                <form>
                    <div>
                        <div className="filter_slider">
                            <InputRange
                                minValue={0}
                                maxValue={100000}
                                value={products.value}
                                formatLabel={value => `₹${value}`}
                                onChange={this.handleChange} />
                            <div className="filter_label">Price</div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-blue" onClick={this.submitFilter}>Apply</button>
                </form>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ productsRangeListing, productsRangeListingUpdate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);