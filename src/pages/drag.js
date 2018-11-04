import React from 'react'
import ReactDOM from 'react-dom'
import dragula from 'react-dragula'
// var React = require('react');
// var dragula = require('react-dragula');
export  default  class App extends React.Component {
    componentDidMount() {
        var container = ReactDOM.findDOMNode(this);
        dragula([container]);
    }
    render() {
        return <div className='container'>
            <div>Swap me around</div>
            <div>Swap her around</div>
            <div>Swap him around</div>
            <div>Swap them around</div>
            <div>Swap us around</div>
            <div>Swap things around</div>
            <div>Swap everything around</div>
        </div>;
    }
}
