import React, { Component } from "react";
import { connect } from "react-redux";
import { searchProducts } from "../action";
import { bindActionCreators } from "redux";

class Search extends Component {

    state = {
        keyword: "",
        inputVisible: false,
    };

    constructor(props) {
        super(props);
    }

    handleClick = event => {
        const { inputVisible } = this.state;
        this.setState({ inputVisible: !inputVisible })
    }

    handleChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        }, () => {
            const { keyword } = this.state;
            this.props.searchProducts(keyword);
        });
    };

    render() {
        const { inputVisible, keyword } = this.state;
        return (
            <div className="header_search mr-3">
                <input type="text" placeholder="Search Products" className={`${inputVisible ? 'show' : ''} header_input`}
                    name="keyword" value={keyword} onChange={this.handleChange} />
                <i onClick={this.handleClick} className="fa fa-search header_icon header_icon_search" aria-hidden="true"></i>
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
    return bindActionCreators({ searchProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);