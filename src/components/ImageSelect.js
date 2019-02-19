import React from 'react';
import GiphySearch from './GiphySearch';

class ImageSelect extends React.Component {
    state = {
        imgSrc:"upload",
    }
    constructor(){
        super();
        this.fileInput = React.createRef();
        this.updateInput = this.updateInput.bind(this);
        this.handleGiphy = this.handleGiphy.bind(this);
    }
    updateInput(e){
        console.log(e, this.fileInput);
        this.props.fileRef(this.fileInput)
    }
    handleGiphy(){
        return this.props.handleGiphy
    }
    imgSelect(val){
        this.setState({imgSrc:val})
    }

    render(){
        return(
            <div className="image inputHolder">
                <p>Add an image and you're good to go</p>
                <br/>
                <strong onClick={()=>this.imgSelect('upload')} className={this.state.imgSrc == 'upload' ? 'active' : ''}>Upload Image</strong>
                <strong onClick={()=>this.imgSelect('giphy')} className={this.state.imgSrc == 'giphy' ? 'active' : ''}>Search Giphy</strong>
                <div className={this.state.imgSrc+' imageOptsWrap'} >
                    <div className="imageUpload">
                        <input type="file" ref={this.fileInput} name="bg_image" className="imagePick" placeholder="background" onChange={this.updateInput}></input>
                        <label for="bg_image">Upload Image</label>
                    </div>
                    <GiphySearch onGiphySearch={this.props.handleGiphy}></GiphySearch>
                </div>
                
            </div>
        )
    }
}
export default ImageSelect