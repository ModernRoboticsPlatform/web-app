import React, { Component } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { orientationAction } from './actions';

class App extends Component {

  componentDidMount() {
    const client = new W3CWebSocket('ws://192.168.1.188:30080/websocket');
    client.onopen = () => {
      client.send("message")
      console.log('WebSocket Client Connected');
    };

    client.onmessage = ( message ) => {
      if( message.data ){
        this.props.orientationAction( JSON.parse( message.data ))
      }
      else {
        console.log( message )
      }
    };

  };

  render() { 
    return (
      <div>
        Orientation
        <div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui red button">
              <i className="fighter jet icon"></i> Pitch
            </div>
            <a className="ui basic red left pointing label">
              { this.props.orientation.pitch.toFixed(3) }
            </a>
          </div>
        </div>
        <div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui basic green button">
              <i className="plane icon"></i> Roll
            </div>
            <a className="ui basic left pointing green label">
              { this.props.orientation.roll.toFixed(3) }
            </a>
          </div>
       <div>
       </div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui basic blue button">
              <i className="space shuttle icon"></i> Yaw
            </div>
            <a className="ui basic left pointing blue label">
              { this.props.orientation.yaw.toFixed(3) }
            </a>
          </div>
       </div>
        Acceleration
        <div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui red button">
              <i className="fighter jet icon"></i> X
            </div>
            <a className="ui basic red left pointing label">
              { this.props.acceleration.pitch.toFixed(3) }
            </a>
          </div>
        </div>
        <div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui basic green button">
              <i className="plane icon"></i> Y
            </div>
            <a className="ui basic left pointing green label">
              { this.props.acceleration.roll.toFixed(3) }
            </a>
          </div>
       <div>
       </div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui basic blue button">
              <i className="space shuttle icon"></i> Z
            </div>
            <a className="ui basic left pointing blue label">
              { this.props.acceleration.yaw.toFixed(3) }
            </a>
          </div>
       </div>
       Heading
       <div>
          <div className="ui labeled button" tabindex="0">
            <div className="ui basic blue button">
              <i className="compass outline icon"></i> Degrees
            </div>
            <a className="ui basic left pointing blue label">
              { this.props.compass.degrees.toFixed(3) }
            </a>
          </div>
       </div>
       </div>
       )
   }
}


const mapStateToProps = (state) => {
  return { 
     orientation: state.orientation,
     acceleration: state.acceleration,
     compass: state.compass
   };
};


//
// Bind mapStateToProps and the selected action creator
//
export default connect(mapStateToProps, { orientationAction } )(App);
