// Action Creator
export const orientationAction = data => {

  // Return an action
  return {
    type: data.type,
    payload: data.data
  }
}