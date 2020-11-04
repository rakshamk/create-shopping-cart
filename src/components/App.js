
import React from "react";
import SubHeader from "./Subheader";
import ShoppingList from "./Shoppinglist";
import Filter from "./Filter";
import Header from "./Header";

const App = () => (
    <>
        <Header />
        <div className="container-fluid">
            <div className="product_container container_common">
                <div className="row">
                    {/* <div className="col-2 product_col_filter">
                        <Filter />
                    </div> */}
                    <div className="col-12 product_col_list">
                        <SubHeader />
                        <ShoppingList />
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default App;