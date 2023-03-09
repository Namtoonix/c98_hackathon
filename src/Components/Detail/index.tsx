import { useState } from "react";
import { useParams } from "react-router-dom";
import ModalForm from "../ModalForm";
import Percent from "../Percent";
import PollList from "../PollList";
import { useAccount, useContractRead } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";
import { ethers } from "ethers";
import { formatNumberView } from "../../hooks";

const DEFAULT_PROJECT = {
  title: "Fushionist",
  description:
    "Fusionist is a scalable and sustainable Sci-Fi universe with a combination of sophisticated game design and deflationary token mechanics. You can command your Bi·Mech in PvP, PvE, and even E-Sports tournaments in Fusionst to earn tokens and other NFT rewards. This NFT collection will have an exclusive coating style - Supreme Dominance, superior attributes, and a higher chance of receiving new weapons when upgrading to become more badass which can be used in Fusionist",
  value: 150000,
  quantity: 12,
  polls: Array(2).fill({
    title: "Poll",
    description: "relative flex flex-wrap items-center overflow-hidden",
    value: 90,
    status: 40,
  }),
};

function Detail() {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { address } = useAccount();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const { data: project }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getProject",
    args: [params?.id],
    onSuccess(data: any) {
      if (data.seler === address) {
        setIsOwner(true);
      }
    },
  });

  const { data: projectsVote }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getProjectsVote",
  });

  console.log("project", project);
  console.log("projectsVote", projectsVote);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="relative flex flex-wrap items-center overflow-hidden lg:mx-0 mx-[-8px] bg-[#000]">
      <div className="relative w-full">
        <img
          width="100%"
          src={`https://image.tmdb.org/t/p/original//9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg`}
          alt={project?.name}
          className="object-cover opacity-70"
        />
        <img
          className="absolute h-[90%] top-[50%] translate-y-[-50%] z-[3] rounded-[8px] shadow-xl ml-[8px]"
          src={`https://image.tmdb.org/t/p/original/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg`}
          alt={project?.name}
        />
        <div className="absolute bg-[#00000090] inset-0 z-[2]"></div>
      </div>
      <div className="lg:w-1/2 w-full lg:absolute relative z-[4] lg:top-[50%] lg:translate-y-[-50%] lg:left-[50%] lg:ml-auto px-[8px] lg:mt-0 mt-[20px] pb-[20px] pr-[20px]">
        <h2 className="lg:text-[36px] text-[18px] font-[700] text-white">
          {project?.name}{" "}
        </h2>
        <div className="flex items-center">
          <Percent percent={Math.round(Number(10) * 10)} />
          <span className="ml-[12px] text-white font-[700]">Process</span>
        </div>
        <p className="font-[600] text-white text-[20px] mt-[20px]">
          Description
        </p>
        <p className="text-white text-[16px]">{project?.description}</p>

        {project && (
          <>
            <p className="font-[600] text-white text-[20px] mt-[20px]">Total</p>
            <p className="text-white text-[16px]">
              {ethers.utils.formatEther(project?.totalPrice)} BNB
            </p>

            <p className="font-[600] text-white text-[20px] mt-[20px]">
              Max person
            </p>
            <p className="text-white text-[16px]">
              {formatNumberView(project?.amountPerson)}
            </p>

            <p className="font-[600] text-white text-[20px] mt-[20px]">
              Contributed person
            </p>
            <p className="text-white text-[16px]">
              {formatNumberView(project?.contributePerson)}
            </p>

            <p className="font-[600] text-white text-[20px] mt-[20px]">
              Contributed BNB
            </p>
            <p className="text-white text-[16px]">
              {ethers.utils.formatEther(project?.contributePrice)} BNB
            </p>
          </>
        )}

        {isOwner && (
          <button
            className="team-card__btn primary-btn"
            onClick={() => setOpenModal(true)}
          >
            Create Poll
          </button>
        )}

        <PollList
          listPoll={projectsVote?.filter(
            (item: any) =>
              Number(
                (ethers.utils.formatEther(item?.projectId) as any) * 1e18
              ) === Number(params.id)
          )}
          isOwner={isOwner}
        />

        <ModalForm
          id={Number(params.id)}
          closeModal={handleCloseModal}
          modalIsOpen={openModal}
        />
      </div>
    </div>
  );
}

export default Detail;
