import React, {Component} from "react"
import { Link } from "react-router-dom";

// class SampleLeft extends Component {
    // render(){
const SampleLeft = () => {
        return( 
            <nav>
                <Link to="/sample"><h3>input</h3></Link>
                <h3>model</h3>
            </nav>
        )
    }
// }

export default SampleLeft;
