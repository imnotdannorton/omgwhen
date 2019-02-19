import React from 'react';
import { Link } from 'react-router-dom';
import {Timer} from './Timer';
import CalendarEvent from './CalendarEvent';


const CountDetail = props => {
    // state = {
    //     config:null
    // }
    // componentWillMount(){
    //     if(this.props.config){
    //         this.setState({config:this.props.config});
    //     }
    // }
    return(
        <div className={props.config.style}>
            <Link to="/"><button>Create</button></Link>
            <style dangerouslySetInnerHTML={{__html:props.config.custom_styles}}></style>
            <h1>{props.config.headline}</h1>
            <Timer target_time={props.config.target_time} ></Timer>
            <p>{props.config.description}</p>
            <p>{props.config.location}</p>
            <img src={props.config.bg_image}/>
            <CalendarEvent date={props.config.target_time} title={props.config.headline} desc={props.config.description} ></CalendarEvent>
        </div>
    )
}
export default CountDetail;