import React from 'react';

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
            <style dangerouslySetInnerHTML={{__html:props.config.custom_styles}}></style>
            <h1>{props.config.headline}</h1>
            <h4></h4>
            <p>{props.config.description}</p>
            <p>{props.config.location}</p>
        </div>
    )
}
export default CountDetail;