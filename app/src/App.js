import React, { Component } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Gamepad from 'react-gamepad'

import { messageReceivedAction } from './actions';

const WEB_SOCKET_HOST = process.env.REACT_APP_WEB_SOCKET_HOST || window.location.host

class App extends Component {

  componentDidMount() {
    const websockerUrl = 'ws://' + WEB_SOCKET_HOST + '/websocket'
    console.log( "Connecting to: " + websockerUrl )

    const client = new W3CWebSocket( websockerUrl  );
    client.onopen = () => {
      client.send( JSON.stringify( { "type":"subscribe", "data": ["telemetry"] } ) )
      console.log('WebSocket Client Connected');
    };

    setInterval(() => {
      client.send( JSON.stringify( { "type":"ping","data": Date.now() } ) )
    }, 1000)

    client.onmessage = ( message ) => {
      if( message.data ){
        this.props.messageReceivedAction( JSON.parse( message.data ))
      }
      else {
        console.log( message )
      }
    };

  };

  connectHandler(gamepadIndex) {
    console.log(`Gamepad ${gamepadIndex} connected !`)
  }
 
  disconnectHandler(gamepadIndex) {
    console.log(`Gamepad ${gamepadIndex} disconnected !`)
  }
 
  buttonChangeHandler(buttonName, down) {
    console.log(buttonName, down)
  }
 
  axisChangeHandler(axisName, value, previousValue) {
    console.log(axisName, value)
  }
 
  buttonDownHandler(buttonName) {
    console.log(buttonName, 'down')
  }
 
  buttonUpHandler(buttonName) {
    console.log(buttonName, 'up')
  }
 
  render() { 
    return (
      <Gamepad
            onConnect={this.connectHandler}
            onDisconnect={this.disconnectHandler}

            onButtonChange={this.buttonChangeHandler}
            onAxisChange={this.axisChangeHandler}
      >
      <div>
        <div>
          <b>Ping:</b> { this.props.ping }ms
        </div>
        <b>Orientation</b>
        <div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui red button">
              <i className="fighter jet icon"></i> Pitch
            </div>
            <a className="ui basic red left pointing label">
              { this.props.orientation.pitch.toFixed(3) }
            </a>
          </div>
        </div>
        <div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui basic green button">
              <i className="plane icon"></i> Roll
            </div>
            <a className="ui basic left pointing green label">
              { this.props.orientation.roll.toFixed(3) }
            </a>
          </div>
       <div>
       </div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui basic blue button">
              <i className="space shuttle icon"></i> Yaw
            </div>
            <a className="ui basic left pointing blue label">
              { this.props.orientation.yaw.toFixed(3) }
            </a>
          </div>
       </div>
        <b>Acceleration</b>
        <div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui red button">
              <i className="fighter jet icon"></i> X
            </div>
            <a className="ui basic red left pointing label">
              { this.props.acceleration.pitch.toFixed(3) }
            </a>
          </div>
        </div>
        <div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui basic green button">
              <i className="plane icon"></i> Y
            </div>
            <a className="ui basic left pointing green label">
              { this.props.acceleration.roll.toFixed(3) }
            </a>
          </div>
       <div>
       </div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui basic blue button">
              <i className="space shuttle icon"></i> Z
            </div>
            <a className="ui basic left pointing blue label">
              { this.props.acceleration.yaw.toFixed(3) }
            </a>
          </div>
       </div>
       <b>Heading</b>
       <div>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui basic blue button">
              <i className="compass outline icon"></i> Degrees
            </div>
            <a className="ui basic left pointing blue label">
              { this.props.compass.degrees.toFixed(3) }
            </a>
          </div>
       </div>
       </div>
       </Gamepad>
       )
   }
}


const mapStateToProps = (state) => {
  return { 
     orientation: state.orientation,
     acceleration: state.acceleration,
     compass: state.compass,
     ping: state.ping
   };
};


//
// Bind mapStateToProps and the selected action creator
//
export default connect(mapStateToProps, { messageReceivedAction } )(App);
