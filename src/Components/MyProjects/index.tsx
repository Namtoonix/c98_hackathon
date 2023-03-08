import { useAccount, useContractRead } from "wagmi";
import ProjectList from "../ProjectList";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";

interface IProps {
  typeView: string;
  id?: string;
}

function MyProjects(props: IProps) {
  const { typeView } = props;
  const { address } = useAccount();

  // Read List Project
  const { data: listCreatedProjects }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getOwnerProject",
    args: [address],
  });

  // read list Project valid to vote
  const { data: listValidProjects }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getOwnerProjectEligible",
    args: [address],
  });

  console.log("listCreatedProjects", listCreatedProjects);
  console.log("listValidProjects", listValidProjects);

  return (
    <ProjectList
      listCreatedProjects={listCreatedProjects}
      typeView={typeView}
    />
  );
}

export default MyProjects;
