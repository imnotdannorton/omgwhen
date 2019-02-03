import React from 'react';
import firestore from "./firestore";
import firebase from 'firebase';
import CountDetail from './CountDetail';
class Countdown extends React.Component {
    state = {
        countdown:null
    }
    constructor(props){
        super(props);
    }
    getCountdown(slug){
        let val = slug || 'first-time';
        const db = firebase.firestore();
        console.log(db);
        const countdownItem = db.collection('countdowns').where('slug', '==', slug);
        countdownItem.get().then(countObj => {
            console.log(countObj.docs[0].data());
            countObj.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
              });
            this.setState({
                countdown:countObj.docs[0].data()
            })
        });
    }
    componentDidMount() {
        let countSlug = this.props.match.params['countId']
        this.getCountdown(countSlug);
    }
    render() {
        const hasCountdown = this.state.countdown !== null;
        let contents;
        if (hasCountdown) {
            contents = <CountDetail config={this.state.countdown}></CountDetail>
        }else{
            contents = <h3>LOADING</h3>
        }
        return (
            <div>
                {contents}
            </div>
        )
    }
}

export  { Countdown };