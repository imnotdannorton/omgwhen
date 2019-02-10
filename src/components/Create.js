import React from 'react';
import firestore from "./firestore";
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'

class Create extends React.Component {
    state = {
        bg_image: "",
        custom_styles: "",
        description: "",
        headline: "",
        location: "",
        slug: "",
        style: "",
        go_link:"",
        target_time: new Date()
    }
    constructor(){
        super();
        this.fileInput = React.createRef();
        
    }
    updateInput = e => {
        console.log(e.target);
        if(e.target.name == 'bg_image'){
            this.setState({bg_image:this.fileInput.current.files[0]})
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        
    }
    handleDate = e => {
        let targetDate = new Date(e);
        let ms = targetDate.getTime();
        console.log(e, ms);
        this.setState({target_time:targetDate})
    }
    submitForm = e => {
        e.preventDefault();
        // const db = firebase.firestore();
        // console.log(db);
        // const newCountdown = db.collection('countdowns');
        if(this.state.bg_image){
            this.imageHandler(this.state.bg_image).then((success)=>{
                    console.log('uploaded!', success);
                    success.ref.getDownloadURL().then( (downloadURL)=>{
                        console.log('File available at', downloadURL);
                        this.setState({bg_image:downloadURL});
                        this.addRecord()
                    });
                    
                }, (e)=>{
                    console.log('img error', e);
                }
                
            )
        }else{
            this.addRecord();
        }
    }
    addRecord(){
        const db = firebase.firestore();
        console.log(db);
        const newCountdown = db.collection('countdowns');
        newCountdown.add(this.state).then((success)=>{
            console.log(success);
            this.setState({go_link:'/until/'+this.state.slug});
        })
    }
    imageHandler(file){
        const storageRef = firebase.storage().ref();
        let metaData = {
            contentType: 'image/jpeg'
        }
        console.log(file);
        let uploadRef = storageRef.child('images/'+file.name).put(file, metaData);
        uploadRef.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
            //   this.setState({bg_image:downloadURL})
            });
          });
        return uploadRef
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
        let showGoLink = this.state.go_link.length > 0;
        let goLink;
        if(showGoLink){
            goLink = <button><Link to={this.state.go_link}>View</Link></button>
        }
        return (
            <div class="formWrap">
                <h1>It's All Happening. Create Your Event:</h1>
                <form onSubmit={this.submitForm}>
                    <div className="headline inputHolder">
                        <label for="headline">What's going on?</label>
                        <input type="text" name="headline" placeholder="headline" onChange={this.updateInput}></input>
                    </div>
                    <div className="timestamp inputHolder">
                        <label for="target_time">When?</label>
                        <DateTimePicker onChange={this.handleDate} value={this.state.target_time}></DateTimePicker>
                    </div>
                    <div className="description inputHolder">
                        <label for="description">Y Tho?</label>
                        <textarea type="text" name="description" placeholder="description" onChange={this.updateInput}></textarea>
                    </div>
                    
                    <div className="slug inputHolder">
                        <label for="slug">Give it a home. ex: omgwhen.io/until<em>my-awesome-party</em></label>
                        <input type="text" name="slug" placeholder="my-custom-link" onChange={this.updateInput}></input>
                    </div>
                    <div className="image inputHolder">
                        <label for="bg_image">Add an image and you're good to go</label>
                        <input type="file" ref={this.fileInput} name="bg_image" placeholder="background" onChange={this.updateInput}></input>
                    </div>
                    {/* <input type="text" name="style" placeholder="style" onChange={this.updateInput}></input>
                    
                    <input type="text" name="custom_styles" placeholder="custom" onChange={this.updateInput}></input> */}
                    <button type="submit">Create</button>
                    {goLink}
                </form>
            </div>
            
        )
    }
}

export  { Create };