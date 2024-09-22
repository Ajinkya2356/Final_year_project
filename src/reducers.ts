export interface State {
  count: number;
}
const initialState: State = {
  count: 0,
};
interface IncrementAction {
  type: 'INCREMENT';
}

type Action = IncrementAction;

function rootReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}

export default rootReducer;