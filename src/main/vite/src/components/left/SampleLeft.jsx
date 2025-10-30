import React, {Component} from "react"
import { Link } from "react-router-dom";

// class SampleLeft extends Component {
//     render(){
const SampleLeft = () => {
        return( 
            <div>
                <Link to="/sample"><h3>input</h3></Link>
                <Link to=""><h3>model</h3></Link>
            </div>
        )
    }
// }

export default SampleLeft;
