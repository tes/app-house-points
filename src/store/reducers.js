const initialState = {
  user: null,
  schools: [],
  school: null,
  isLoading: false,
};

const types = {
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  SET_SCHOOL: 'SET_SCHOOL',
  SET_HOUSE_POINTS: 'SET_HOUSE_POINTS',
  LOADING: 'LOADING',
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGOUT: {
      return { ...initialState };
    }
    case types.SET_USER: {
      return { ...state, ...action.payload };
    }
    case types.SET_SCHOOL: {
      return { ...state, school: action.payload };
    }
    case types.SET_HOUSE_POINTS: {
      const school = { ...state.school };
      school.houses = school.houses.filter(h => h.id !== action.payload.id).concat(action.payload);
      return { ...state, school };
    }
    case types.LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export { initialState, types, reducer };