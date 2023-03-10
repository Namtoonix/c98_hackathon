import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";
import image from "../../assets/images/shibainu.jpeg";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";
import { formatNumberView } from "../../hooks";
import { toast } from "react-toastify";

import "./styles.scss";
import { ethers } from "ethers";

declare const window: any;

function CardProject(props: any) {
  const { data, className, isOwner = false } = props;

  const { address } = useAccount();

  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);

  const [voteData, setVoteData] = useState<{
    projectId: number;
    price: number;
  } | null>();

  useEffect(() => {
    setVoteData({
      projectId: Number(formatNumberView(data?.id)),
      price:
        (ethers.utils.formatEther(data.totalPrice) as any) / data.amountPerson,
      //  Number(
      //   Number(formatNumberView(data?.totalPrice / data.amountPerson)).toFixed(
      //     2
      //   )
      // ),
    });
  }, [data]);

  // const { config: configLong } = usePrepareContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: CONTRACT_ABI,
  //   functionName: "investProject",
  //   args: [voteData?.projectId, 2],
  //   overrides: {
  //     //price * 10^18 ==> a Nam check giup em
  //     // value:  1*1000000000000000000,
  //     value: 0.02 * 1000000000000000000,
  //   },
  // });

  // const {
  //   data: voteProject,
  //   isLoading: isCreateLoading,
  //   isSuccess: isCreateSuccess,
  //   write: investProject,
  // } = useContractWrite(configLong);

  const handleInvest = async () => {
    if (data.seler === address) {
      toast.error("Owner can't join!");
      return;
    } else if (
      ethers.utils.formatEther(data.contributePerson) ===
      ethers.utils.formatEther(data.amountPerson)
    ) {
      toast.error("The project is full of people!");
      return;
    }
    await contract.methods
      //investProject(projectId, price)
      .investProject(voteData?.projectId, (voteData?.price as number) * 1e18)
      .send({
        from: address,
        value: (voteData?.price as number) * 1000000000000000000,
      });
  };

  return (
    <>
      <article className={`team-card ${className}`}>
        <div className="team-card__img-box">
          <img
            className="team-card__img"
            src={image}
            alt="Close-Up Photography of Giraffe"
          />
        </div>
        <div className="team-card__content">
          <hgroup className="team-card__intro">
            <h3 className="team-card__title">{data.name}</h3>
          </hgroup>
          <p className="team-card__desc">{data.description}</p>
          <p className="team-card__mail">
            Total: <span>{ethers.utils.formatEther(data.totalPrice)} BNB</span>
          </p>
          <p className="team-card__mail">
            Max person: <span>{formatNumberView(data.amountPerson)}</span>
          </p>
          {data?.contributePerson && (
            <p className="team-card__mail">
              Contributed person:{" "}
              <span>{formatNumberView(data.contributePerson)}</span>
            </p>
          )}

          {data?.contributePrice && (
            <p className="team-card__mail">
              Contributed BNB :{" "}
              <span>{ethers.utils.formatEther(data.contributePrice)} BNB</span>
            </p>
          )}
          {!isOwner && (
            <button
              className="team-card__btn primary-btn"
              onClick={() => handleInvest()}
            >
              Vote
            </button>
          )}
        </div>
      </article>
    </>
  );
}

export default CardProject;
