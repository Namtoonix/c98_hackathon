import { useReducer } from "react";
import { useAccount, useContractRead } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../constant";
import Context from "./Context";
import { initialState, Reducer, actions } from "./store";

const Provider = (props: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const { address } = useAccount();
  // Read List Project
  const { data: listCreatedProjects } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getOwnerProject",
    args: [address],
  });

  console.log("listCreatedProjectsasshgfhfhgf", listCreatedProjects);

  return (
    <Context.Provider value={{ state, dispatch, actions, listCreatedProjects }}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
