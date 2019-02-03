import React from 'react';
import firestore from "./firestore";
import firebase from 'firebase';

class Create extends React.Component {
    state = {
        bg_image: "",
        custom_styles: "",
        description: "",
        headline: "",
        location: "",
        slug: "",
        style: ""
    }
    constructor(){
        super();
    }
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitForm = e => {
        e.preventDefault();
        const db = firebase.firestore();
        console.log(db);
        const newCountdown = db.collection('countdowns');
        newCountdown.add(this.state).then((success)=>{
            console.log(success);
        })
    }
    clearForm (){
        return {
            bg_image: "",
            custom_styles: "",
            description: "",
            headline: "",
            location: "",
            slug: "",
            style: ""
        }
    }
    render() {
        return (
            <form onSubmit={this.submitForm}>
                <input type="text" name="headline" placeholder="headline" onChange={this.updateInput}></input>
                <input type="text" name="target_time" placeholder="time" onChange={this.updateInput}></input>
                <input type="text" name="description" placeholder="description" onChange={this.updateInput}></input>
                <input type="text" name="slug" placeholder="slug" onChange={this.updateInput}></input>
                <input type="text" name="style" placeholder="style" onChange={this.updateInput}></input>
                <input type="text" name="bg_image" placeholder="background" onChange={this.updateInput}></input>
                <input type="text" name="custom_styles" placeholder="custom" onChange={this.updateInput}></input>
                <button type="submit">Create</button>
            </form>
        )
    }
}

export  { Create };