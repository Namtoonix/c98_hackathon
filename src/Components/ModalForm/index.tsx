import { useState } from "react";
import Modal from "react-modal";

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
  name: string;
  description: string;
  amountPerson: string;
  totalPrice: string;
}

interface IProps {
  modalIsOpen: boolean;
  closeModal: any;
}

const initData = {
  name: "",
  description: "",
  amountPerson: "",
  totalPrice: "",
};

const ModalForm = (props: IProps) => {
  const { modalIsOpen, closeModal } = props;
  const [pollData, setPollData] = useState<PollDataI>(initData);

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
            name="name"
            value={pollData.name}
            onChange={(e) => handleChangeDataProject(e)}
            placeholder="Poll Name"
            className="input"
          />
          <textarea
            name="description"
            placeholder="Poll Description"
            onChange={(e) => handleChangeDataProject(e)}
            value={pollData.description}
            className="input"
          />
          <input
            type="text"
            name="amountPerson"
            placeholder="Poll Values"
            onChange={(e) => handleChangeDataProject(e)}
            value={pollData.amountPerson}
            className="input"
          />

          <button
            className="btn mt-8"
            type="button"
            onClick={() => console.log()}
          >
            Create PolL
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalForm;
