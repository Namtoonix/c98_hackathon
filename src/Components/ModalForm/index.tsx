import { useState } from "react";
import Modal from "react-modal";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";

const customStyles = {
  overlay: {
    zIndex: 99,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface PollDataI {
  title: string;
  expirationDate: string;
  value: string;
}

interface IProps {
  id:number
  modalIsOpen: boolean;
  closeModal: any;
}

const initData = {
  title: "",
  expirationDate: "",
  value: "",
};

const ModalForm = (props: IProps) => {
  const { modalIsOpen, closeModal, id } = props;
  const [pollData, setPollData] = useState<PollDataI>(initData);

  //Create project
  const { config: configLong } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "createVoteProject",
    args: [
      id,
      pollData.title,
      pollData.expirationDate,
      pollData.value,
    ],
    // onSuccess() {
    //   toast.success("Project initialization successful!");
    // },
  });

  const {
    data: createData,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    write: createVoteProject,
  } = useContractWrite(configLong);


  const { isSuccess: isCreateConfirmed } = useWaitForTransaction({
    hash: createData?.hash,
    confirmations: 1,
    onSuccess() {
      setPollData(initData);
    },
  });

  const handleChangeDataProject = (e: any) => {
    const { value, name } = e.target;
    setPollData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form action="#" className="form" id="form1">
        <div className="py-10">
          <h2 className="form__title">Create Poll</h2>
          <input
            type="text"
            name="title"
            value={pollData.title}
            onChange={(e) => handleChangeDataProject(e)}
            placeholder="Title"
            className="input"
          />
          <textarea
            name="expirationDate"
            placeholder="Expiration Date"
            onChange={(e) => handleChangeDataProject(e)}
            value={pollData.expirationDate}
            className="input"
          />
          <input
            type="text"
            name="value"
            placeholder="Value"
            onChange={(e) => handleChangeDataProject(e)}
            value={pollData.value}
            className="input"
          />

          <button
            className="btn mt-8"
            type="button"
            onClick={() => createVoteProject?.()}
          >
            Create PolL
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalForm;
