export const distanceReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DISTANCE':
        return action.dists;
    default:
        return state;
  }
} 