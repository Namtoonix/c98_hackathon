import { useRef, useState } from "react";
import "./styles.scss";
import CardList from "../CardList";
import { FaChartBar, FaMoneyBillAlt } from "react-icons/fa";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import CustomConnnectButton from "../CustomConnectButton";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constant";
import { toast } from "react-toastify";
import { ethers } from "ethers";

interface ProjectDataI {
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

function FormCreate() {
  // handle transaction
  const { address, isConnected } = useAccount();
  const [projectData, setProjectData] = useState<ProjectDataI>(initData);

  //Create project
  const { config: configLong } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "createProject",
    args: [
      projectData.name,
      projectData.description,
      projectData.amountPerson,
      (projectData.totalPrice as any) * 1e18,
    ],
    // onSuccess() {
    //   toast.success("Project initialization successful!");
    // },
  });

  const {
    data: createData,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    write: createProject,
  } = useContractWrite(configLong);

  const { isSuccess: isCreateConfirmed } = useWaitForTransaction({
    hash: createData?.hash,
    confirmations: 1,
    onSuccess() {
      setProjectData(initData);
    },
  });

  console.log("isCreateLoading", isCreateLoading);
  console.log("isCreateSuccess", isCreateSuccess);
  console.log("isCreateConfirmed", isCreateConfirmed);

  // Read List Project
  const { data: listCreatedProjects } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getProjects",
    onSuccess(data) {
      console.log("Success", data);
    },
  });


  const container: any = useRef();

  const handleCreateProject = () => {
    container.current &&
      container.current.classList.remove("right-panel-active");
  };

  const handleViewProject = () => {
    container.current && container.current.classList.add("right-panel-active");
  };

  const handleChangeDataProject = (e: any) => {
    const { value, name } = e.target;
    setProjectData((prev: any) => ({ ...prev, [name]: value }));
  };

  console.log("projectData", projectData);
  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-end mt-10 mr-10 gap-8 items-center">
        {isConnected && (
          <div className="flex gap-6 items-center">
            <a
              href="/my-projects"
              className="hover:scale-105 duration-300 cursor-pointer flex items-center text-[14px] gap-2  text-white"
            >
              <FaChartBar size={34} color={"white"} /> My Projects
            </a>
            <a
              href="/my-invest-projects"
              className="hover:scale-105 duration-300 cursor-pointer flex items-center text-[14px] gap-2 text-white"
            >
              <FaMoneyBillAlt size={34} color={"white"} /> My Invested Project
            </a>
          </div>
        )}

        <CustomConnnectButton type="top" />
      </div>

      <div className="flex-1 flex justify-center items-center h-full">
        <div className="w-[768px] relative">
          <div ref={container} className="container right-panel-active">
            <div className="container__form container--signup">
              <form action="#" className="form" id="form1">
                <h2 className="form__title">Create Project</h2>
                <input
                  type="text"
                  name="name"
                  value={projectData.name}
                  onChange={(e) => handleChangeDataProject(e)}
                  placeholder="Project Name"
                  className="input"
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  onChange={(e) => handleChangeDataProject(e)}
                  value={projectData.description}
                  className="input"
                />
                <input
                  type="text"
                  name="amountPerson"
                  placeholder="Amount Person"
                  onChange={(e) => handleChangeDataProject(e)}
                  value={projectData.amountPerson}
                  className="input"
                />
                <input
                  type="text"
                  name="totalPrice"
                  placeholder="Project Quantity"
                  onChange={(e) => handleChangeDataProject(e)}
                  value={projectData.totalPrice}
                  className="input"
                />
                {isConnected ? (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => createProject?.()}
                  >
                    Create
                  </button>
                ) : (
                  <div className="mt-6">
                    <CustomConnnectButton />
                  </div>
                )}
              </form>
            </div>

            <div className="container__form container--signin">
              <CardList cards={listCreatedProjects || []} />
            </div>

            <div className="container__overlay">
              <div className="overlay">
                <div className="overlay__panel overlay--left">
                  <button className="btn" onClick={handleCreateProject}>
                    View Project
                  </button>
                </div>

                <div className="overlay__panel overlay--right">
                  <button className="btn" onClick={handleViewProject}>
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCreate;
