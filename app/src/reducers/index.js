import { combineReducers } from 'redux';


//
// Handle a SELECTED action
//
const ORIENTATION = {
  pitch: 0,
  roll: 0,
  yaw: 0
}

const orientationReducer = (orientation = ORIENTATION , action ) => {
  if ( action.type === "ORIENTATION") {
    orientation = action.payload
    return orientation
  }

  return orientation;
};


//
// Handle a SELECTED action
//
const ACCELERATION = {
  pitch: 0,
  roll: 0,
  yaw: 0
}

const accelerationReducer = (acceleration = ACCELERATION , action ) => {
  if ( action.type === "ACCELERATION") {
    acceleration = action.payload
    return acceleration
  }

  return acceleration;
};

//
// Handle a SELECTED action
//
const COMPASS = {
  degrees: 0
}

const compassReducer = (compass = COMPASS , action ) => {
  if ( action.type === "COMPASS") {
    compass = action.payload
    return compass
  }

  return compass;
};


const pingReducer = (ping = -1 , action ) => {
  if ( action.type === "pong") {
    console.log( action )
    ping =  Date.now() - action.payload.time
    return ping
  }
  return ping;
};


//
// Must add reducers to combineReducer
//
export default combineReducers({
  orientation: orientationReducer,
  acceleration: accelerationReducer,
  compass: compassReducer,
  ping: pingReducer
});
