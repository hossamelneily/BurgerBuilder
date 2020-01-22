import React from 'react';
import Layout from "./components/Layout/Layout";
import Burgerbuilder from "./containers/BurgerBuilder/burgerbuilder";
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";

function App() {


  return (
        <BrowserRouter>
            <Layout>

                <Route path='/' exact component={Burgerbuilder}/>
                <Route path='checkout' component={Checkout} />
            </Layout>
        </BrowserRouter>

  );
}

export default App;
