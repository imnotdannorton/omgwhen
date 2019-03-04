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
    const divStyle = {'backgroundImage':'url('+props.config.bg_image+')'}
    return(
        
        <div className={"countdown-wrapper "+props.config.style}>
            <Link to="/" className="createNew"><button>Create</button></Link>
            <style dangerouslySetInnerHTML={{__html:props.config.custom_styles}}></style>
            <section class="header">
                <Timer target_time={props.config.target_time} ></Timer>
                <h4>Until</h4>
                <h1>{props.config.headline}</h1>
            </section>
            <div className="imgWrap" style={divStyle}>
                <div class="screen"></div>
                {/* <img src={props.config.bg_image}/> */}
            </div>
            <section className="detailWrap">
                <p>{props.config.description}</p>
                <p>{props.config.location}</p>
                <CalendarEvent date={props.config.target_time} title={props.config.headline} desc={props.config.description} ></CalendarEvent>
            </section>
            
            
            
            
        </div>
    )
}
export default CountDetail;