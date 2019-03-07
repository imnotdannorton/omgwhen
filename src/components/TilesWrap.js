import React from 'react';

class TilesWrap extends React.Component{
    state = {
        init:false,
        tiles:[]
    }
    componentDidMount(){
        this.renderTiles();
    }
    renderTiles(){
        let tiles = [];
        if(!this.state.init){
            for(let i=0; i < 50; i++ ){
                let randV = Math.floor(Math.random()*49)+1;
                let randH = Math.floor(Math.random()*49)+1;
                let delayA = Math.random()*5;
                let durationA = Math.random()*10;
                let style = {gridRow:randV, gridColumn:randH, animationDelay:delayA+'s', animationDuration:durationA+'s'}
                tiles.push(<span key={i} style={style}></span>);
            }
            this.setState({init:true,tiles:tiles})
        }
    }
    render(){
        return (
            <div className="tilesWrap">{this.state.tiles}</div>
        )
    }
    
}

export default TilesWrap;