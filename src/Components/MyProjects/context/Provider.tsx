import { useReducer } from "react";
import Context from "./Context";
import { initialState, Reducer, actions } from "./store";

const Provider = (props: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch, actions }}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
