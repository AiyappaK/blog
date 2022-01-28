import React from "react";
import Aux from "../Aux/aux";
import Toolbar from "../../components/UI/navigation/Toolbar/Toolbar";
import Footer from "../../components/UI/footer/footer";
import Up from "../../components/UI/scrolltoTop/scrollTop";
import "./layout.css"

const layout = props => {
    return (
        <Aux>
            <Toolbar />
            <Up/>
            <main className="main">
                {props.children}
            </main>
            <Footer />
        </Aux>
    )
}
export default layout