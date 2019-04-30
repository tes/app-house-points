import { types } from './reducers';

export const useActions = (state, dispatch) => ({
  logout: data => dispatch({ type: types.LOGOUT, payload: data }),
  setUser: data => dispatch({ type: types.SET_USER, payload: data }),
  setSchool: data => dispatch({ type: types.SET_SCHOOL, payload: data }),
  addPoints: data => dispatch({ type: types.SET_HOUSE_POINTS, payload: data }),
  removePoints: data => dispatch({ type: types.SET_HOUSE_POINTS, payload: data }),
});