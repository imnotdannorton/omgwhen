import React from 'react';
import * as ICS from 'ics-js';
// import { VCALENDAR, VEVENT } from 'ics.js';
import { Link } from 'react-router-dom';

class CalendarEvent extends React.Component {
    state = {
        ics:""
    }
    // componentWillMount(){
    //     if(this.props.config){
    //         this.setState({config:this.props.config});
    //     }
    // }
    constructor(props){
        super(props);
        this.icsLink = this.icsLink.bind(this);
    }
    componentDidMount(){
        this.icsLink()
    }
    icsLink(){
        let dateTime = this.props.date.seconds*1000;
        console.log(this.props);
        let cal = new ICS.VCALENDAR();
        cal.addProp('VERSION', 1) // Number(2) is converted to '2.0'
        cal.addProp('PRODID', 'OMGWHEN');
        let event = new ICS.VEVENT();
        event.addProp('UID');
        event.addProp('DTSTAMP', new Date(dateTime));
        event.addProp('DTSTART', new Date(dateTime));
        event.addProp('DTEND', new Date(dateTime+64000));
        event.addProp('SUMMARY', this.props.title);
        event.addProp('DESCRIPTION', this.props.desc)
        cal.addComponent(event);
        console.log(cal, cal.toString());
        this.setState({ics:cal.toString()});

    }
    render(){
        return(
            <button>
                <a href={'data:text/calendar;charset=utf8,'+escape(this.state.ics)}>Save Event</a>
            </button>
        )
    }
    
}
export default CalendarEvent;