import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
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
    <div className="w-full mt-[20px] py-10 px-[80px] mb-[20px]">
      <form action="#" className="form" id="form1">
        <h2 className="form__title">Create Poll</h2>
        <input
          type="text"
          name="name"
          value={pollData.name}
          onChange={(e) => handleChangeDataProject(e)}
          placeholder="Project Name"
          className="input"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          onChange={(e) => handleChangeDataProject(e)}
          value={pollData.description}
          className="input"
        />
        <input
          type="text"
          name="amountPerson"
          placeholder="Project Values"
          onChange={(e) => handleChangeDataProject(e)}
          value={pollData.amountPerson}
          className="input"
        />
        <input
          type="text"
          name="totalPrice"
          placeholder="Project Quantity"
          onChange={(e) => handleChangeDataProject(e)}
          value={pollData.totalPrice}
          className="input"
        />

        <button className="btn" type="button" onClick={() => console.log()}>
          Create PolL
        </button>
      </form>
    </div>
  );
};

export default ProjectDetailPage;
