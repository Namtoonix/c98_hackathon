import { useState } from "react";
import { useParams } from "react-router-dom";
import ModalForm from "../ModalForm";
import Percent from "../Percent";

const DEFAULT_PROJECT = {
  title: "Fushionist",
  description:
    "'Fusionist is a scalable and sustainable Sci-Fi universe with a combination of sophisticated game design and deflationary token mechanics. You can command your Bi·Mech in PvP, PvE, and even E-Sports tournaments in Fusionst to earn tokens and other NFT rewards. This NFT collection will have an exclusive coating style - Supreme Dominance, superior attributes, and a higher chance of receiving new weapons when upgrading to become more badass which can be used in Fusionist",
  value: 150000,
  quantity: 12,
};

function Detail() {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  
  console.log(params);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="relative flex flex-wrap items-center overflow-hidden lg:bg-transparent lg:mx-0 mx-[-8px]">
      <div className="relative">
        <img
          width="100%"
          src={`https://image.tmdb.org/t/p/original//9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg`}
          alt={DEFAULT_PROJECT.title}
          className="object-cover"
        />
        <img
          className="absolute h-[90%] top-[50%] translate-y-[-50%] z-[3] rounded-[8px] shadow-xl ml-[8px]"
          src={`https://image.tmdb.org/t/p/original/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg`}
          alt={DEFAULT_PROJECT.title}
        />
        <div className="absolute bg-[#00000090] inset-0 z-[2]"></div>
      </div>
      <div className="lg:w-1/2 w-full lg:absolute relative z-[4] lg:top-[50%] lg:translate-y-[-50%] lg:left-[50%] lg:ml-auto px-[8px] lg:mt-0 mt-[20px] pb-[20px]">
        <h2 className="lg:text-[36px] text-[18px] font-[700] text-white">
          {DEFAULT_PROJECT.title}{" "}
        </h2>
        <div className="flex items-center">
          <Percent percent={Math.round(Number(8) * 10)} />
          <span className="ml-[12px] text-white font-[700]">Process</span>
        </div>
        <p className="font-[600] text-white text-[20px] mt-[20px]">Overview</p>
        <p className="text-white text-[16px]">{DEFAULT_PROJECT.description}</p>

        <button
          className="team-card__btn primary-btn"
          onClick={() => setOpenModal(true)}
        >
          Create Poll
        </button>

        <ModalForm closeModal={handleCloseModal} modalIsOpen={openModal} />
      </div>
    </div>
  );
}

export default Detail;
