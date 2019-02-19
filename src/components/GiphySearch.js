import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

class GiphySearch extends React.Component {
    state = {
        gifResults:[], 
        searchString:"",
        previewGif:null
    }
    constructor(){
        super()
        this.fetchGifs = debounce(this.fetchGifs.bind(this), 1000);
        this.inputHandler = this.inputHandler.bind(this);
        
    }
    fetchGifs(query){
        const url = "https://api.giphy.com/v1/gifs/search?api_key="+process.env.REACT_APP_GIPHY_APIKEY+"&q="+query;
        axios(url).then((response)=>{
            let resultsList = response.data.data;
            if(resultsList.length > 0){
                this.setState({gifResults:resultsList})
            }
        })

    }
    inputHandler(e, v){
        let query = e.target.value;
        this.fetchGifs(query);
    }
    selectGif(url, smallUrl){
        this.setState({previewGif:smallUrl, gifResults:[]});
        this.props.onGiphySearch(url);
    }
    render(){
        return(
            <div className="giphySearch">
                <input placeholder="Search on Giphy" type="text" onChange={ (e, v) => this.inputHandler(e,v)}>
                </input>
                {this.state.previewGif && 
                    <img src={this.state.previewGif}></img>
                }
                <div className={this.state.gifResults.length > 0 ? 'active resultsHolder':'resultsHolder'} >
                    <ul>
                    {this.state.gifResults.map((item, key)=>
                        <li key={item.id} style={{backgroundImage:'url('+item.images.fixed_height.url+')'}} onClick={() => this.selectGif(item.images.original.url, item.images.fixed_width_small.url)}>
                            {/* <img src={item.images.fixed_width_small.url}></img> */}
                        </li>
                    )}
                    </ul>
                    
                </div>
            </div>
        )
    }


}

export default GiphySearch