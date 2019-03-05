import React from 'react';
import firestore from "./firestore";
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import GiphySearch from "./GiphySearch";
import ImageSelect from "./ImageSelect";
import CountDetail from "./CountDetail";
import TilesWrap from './TilesWrap';
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
        external_image:false,
        target_time: new Date()
    }
    constructor(){
        super();
        this.fileInput = React.createRef();
        this.handleGiphy = this.handleGiphy.bind(this);
        this.imgSelect = this.imgSelect.bind(this);
    }
    updateInput = e => {
        if(e.target.name == 'bg_image'){
            this.setState({bg_image:this.fileInput.current.files[0]})
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        
    }
    handleGiphy(url){
        // setting external image will bypass upload process since we already have a giphy url
        this.setState({bg_image:url, external_image:true});
    }
    handleDate = e => {
        let targetDate = new Date(e);
        let ms = targetDate.getTime();
        console.log(e, ms);
        this.setState({target_time:targetDate})
    }
    fileHandler = e => {
        this.setState({bg_image:e.current.files[0]})
    }
    suggestSlug = e =>{
        console.log('suggest slug event ', e, e.target.value);
        let suggestedSlug = e.target.value.split(' ').join('-').toLowerCase();
        console.log(suggestedSlug);
        this.setState({slug:suggestedSlug});
    }
    submitForm = e => {
        e.preventDefault();
        // const db = firebase.firestore();
        // console.log(db);
        // const newCountdown = db.collection('countdowns');
        if(this.state.headline.length < 2){
            return
        }
        if(this.state.bg_image && !this.state.external_image){
            this.imageHandler(this.state.bg_image).then((success)=>{
                    success.ref.getDownloadURL().then( (downloadURL)=>{
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
    imgSelect(val){
        this.setState({imgSrc:val})
    }
    imageHandler(file){
        const storageRef = firebase.storage().ref();
        let metaData = {
            contentType: 'image/jpeg'
        }
        let uploadRef = storageRef.child('images/'+file.name).put(file, metaData);
        uploadRef.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //   this.setState({bg_image:downloadURL})
            });
          });
        return uploadRef
    }
    renderPreview(){
        if(this.state.bg_image){
            return <CountDetail config={this.state}></CountDetail>
        }else{
            return null
        }
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
            goLink = <Link to={this.state.go_link}><button class="createBtn">View</button></Link>
        }
        return (
            <div className="formWrap">
                <h1>It's All Happening. Create Your Event:</h1>
                <form onSubmit={this.submitForm}>
                    <div className="headline inputHolder">
                        <label for="headline">What's going on?</label>
                        <input type="text" name="headline" placeholder="headline" onBlur={this.suggestSlug} onChange={this.updateInput}></input>
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
                        <label for="slug">Give it a home. <small>ex: omgwhen.io/until/<em>my-awesome-party</em></small></label>
                        <input type="text" name="slug" placeholder={(this.state.slug == "") ? 'my-awesome-party':this.state.slug} value={this.state.slug} onChange={this.updateInput}></input>
                    </div>
                    <ImageSelect handleGiphy={this.handleGiphy} fileRef={this.fileHandler} updateInput={this.updateInput}></ImageSelect>
                    {/* <div className="image inputHolder">
                        <p>Add an image and you're good to go</p>
                        <br/>
                        <strong onClick={()=>this.imgSelect('upload')} className={this.state.imgSrc == 'upload' ? 'active' : ''}>Upload Image</strong>
                        <strong onClick={()=>this.imgSelect('giphy')} className={this.state.imgSrc == 'giphy' ? 'active' : ''}>Search Giphy</strong>
                        <div className={this.state.imgSrc+' imageOptsWrap'} >
                            <div class="imageUpload">
                                <input type="file" ref={this.fileInput} name="bg_image" className="imagePick" placeholder="background" onChange={this.updateInput}></input>
                                <label for="bg_image">Upload Image</label>
                            </div>
                            <GiphySearch onGiphySearch={this.handleGiphy}></GiphySearch>
                        </div>
                        
                    </div> */}
                    {/* <input type="text" name="style" placeholder="style" onChange={this.updateInput}></input>
                    
                    <input type="text" name="custom_styles" placeholder="custom" onChange={this.updateInput}></input> */}
                    <button type="submit" className="createBtn">Create</button>
                    {goLink}
                </form>
                <TilesWrap></TilesWrap>
            </div>
            
        )
    }
}

export  { Create };