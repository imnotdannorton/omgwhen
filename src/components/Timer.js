import React from 'react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

class Timer extends React.Component {
    state = {
        target_datetime:null, 
        countdown_string:"",
        offsets:{}
    }
    constructor(props){
        super(props);
        this.diffTime = this.diffTime.bind(this);
    }
    componentDidMount(){
        // console.log(this.props.target_time, dayjs().to(dayjs(this.props.target_time.seconds*1000), false) );
        this.setState({target_datetime:this.props.target_time.seconds})
        this.diffTime(this.props.target_time.seconds);
        this.interval = setInterval( ()=>{this.diffTime(this.props.target_time.seconds)}, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    diffTime(target){
        let date = new Date();
        let targetDate = new Date(target*1000);
        console.log(targetDate.toISOString());
        let diff = targetDate - date;
        let months = Math.floor((diff % (1000 * 60 * 60 * 24 * 24 * 30)) / (1000 * 60 * 60 * 24 * 30));
        let days = Math.floor((diff % (1000 * 60 * 60 * 24 * 24)) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);
        let string = months+' months, ' + days+' days, '+hours+' hours, '+minutes+' minutes, '+seconds+' seconds';
        let offsetObj = {months, days, hours, minutes, seconds }
        // console.log(offsetObj);
        if(diff <= 0){
            string = "IT HAPPENED!";
        }
        this.setState({countdown_string:string, offsets:offsetObj});
        // console.log(string);

    }
    render(){
        return(
            <h3>
                {Object.keys(this.state.offsets).map((keyName, i) => (
                    <span className={this.state.offsets[keyName] > 0 ? '':'hidden'} >{this.state.offsets[keyName]} {keyName}</span>
                ))}
            </h3>
        )
    }
}

export { Timer }