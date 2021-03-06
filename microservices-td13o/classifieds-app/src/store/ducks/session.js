/* Events
================================== */
const CLEAR = 'session/CLEAR';
const SET = 'session/SET';

/* Default state
================================== */
const DEFAULT_STATE = null;

/* Reducer
================================== */
const sessionReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case SET:
      return action.session;
    case CLEAR:
      return null;
    default:
      return state;
  }
};

export default sessionReducer;

/* Action creators
================================== */
export const setSession = session => {
  return { type: SET, session };
};

export const clearSession = () => {
  return { type: CLEAR };
};
