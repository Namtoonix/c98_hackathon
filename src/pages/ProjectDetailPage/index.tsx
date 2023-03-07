import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Detail from "../../Components/Detail";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";

interface PollDataI {
  name: string;
  description: string;
  amountPerson: string;
  totalPrice: string;
}

const initData = {
  name: "",
  description: "",
  amountPerson: "",
  totalPrice: "",
};

const ProjectDetailPage = () => {
  const [pollData, setPollData] = useState<PollDataI>(initData);
  // const { config: configLong } = usePrepareContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: CONTRACT_ABI,
  //   functionName: "createProject",
  //   args: [],
  //   // onSuccess() {
  //   //   toast.success("Project initialization successful!");
  //   // },
  // });

  // const {
  //   data: createData,
  //   isLoading: isCreateLoading,
  //   isSuccess: isCreateSuccess,
  //   write: createPoll,
  // } = useContractWrite(configLong);

  // const { isSuccess: isCreateConfirmed } = useWaitForTransaction({
  //   hash: createData?.hash,
  //   confirmations: 1,
  //   onSuccess() {
  //     // setProjectData(initData);
  //   },
  // });

  const handleChangeDataProject = (e: any) => {
    const { value, name } = e.target;
    setPollData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-full min-h-screen">
      <Detail />
    </div>
  );
};

export default ProjectDetailPage;
