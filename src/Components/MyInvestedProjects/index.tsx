import "./styles.scss";

import { useAccount, useContractRead } from "wagmi";
import ProjectList from "../ProjectList";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";

interface IProps {
  typeView: string;
  id?: string;
}

function MyInvestedProjectsPage(props: IProps) {
  const { typeView } = props;
  const { address } = useAccount();
  // Read List Project
  const { data: listCreatedProjects }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getMemberProject",
    args: [address],
  });

  return (
    <ProjectList
      listCreatedProjects={listCreatedProjects}
      typeView={typeView}
    />
  );
}

export default MyInvestedProjectsPage;
