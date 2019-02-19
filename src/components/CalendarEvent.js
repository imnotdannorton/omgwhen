import React from 'react';
import * as ICS from 'ics-js';
// import { VCALENDAR, VEVENT } from 'ics.js';
import { Link } from 'react-router-dom';

class CalendarEvent extends React.Component {
    state = {
        ics:"", 
        gcal:""
    }
    // componentWillMount(){
    //     if(this.props.config){
    //         this.setState({config:this.props.config});
    //     }
    // }
    // https://calendar.google.com/calendar/r/eventedit?text=Your+Event+Name&dates=20140127T224000Z/20140320T221500Z&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml
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
        let myDateObj = new Date(dateTime);
        let year = myDateObj.getFullYear();
        let month = myDateObj.getMonth()+1;
        if(month < 10){
            month = "0"+month;
        }
        
        let day = myDateObj.getDate();
        let untilDay = day+1;
        if(untilDay < 10){
            untilDay = "0"+untilDay;
        }
        if(day < 10){
            day = "0"+day;
        }
        // get timezone info into google friendly format
        let tzFormat = "T"+myDateObj.toISOString().split('T')[1].replace(/:/g, "").replace(".", "").replace("000Z", "")
        let concatDate = year.toString()+month.toString()+day.toString();
        let untilDate = year.toString()+month.toString()+untilDay.toString();
        let gcal = 'https://calendar.google.com/calendar/r/eventedit?text='+this.props.title+'&dates='+concatDate+tzFormat+'Z/'+untilDate+tzFormat+'Z&details='+this.props.desc+'&sf=true&output=xml';
        let cal = new ICS.VCALENDAR();
        cal.addProp('VERSION', 1) // Number(2) is converted to '2.0'
        cal.addProp('PRODID', 'OMGWHEN');
        let event = new ICS.VEVENT();
        event.addProp('UID');
        event.addProp('DTSTAMP', new Date(dateTime));
        event.addProp('DTSTART', new Date(dateTime));
        event.addProp('DTEND', new Date(dateTime+1536000));
        event.addProp('SUMMARY', this.props.title);
        event.addProp('DESCRIPTION', this.props.desc)
        cal.addComponent(event);
        this.setState({ics:cal.toString(), gcal:gcal});

    }
    render(){
        return(
            <div className="calendarLinks">
                <Link download={this.props.title} to={'data:text/calendar;charset=utf8,'+escape(this.state.ics)}>Save Event</Link>
                
                <a href={this.state.gcal}>Save To Google Calendar</a>
            </div>
            
        )
    }
    
}
export default CalendarEvent;