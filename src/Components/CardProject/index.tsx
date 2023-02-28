import { ethers } from "ethers";
import { formatNumberView } from "../../hooks";
import image from "../../assets/images/shibainu.jpeg";
import "./styles.scss";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constant";

declare const window: any;

function CardProject(props: any) {
  const { data } = props;

  const { address } = useAccount();

  console.log(address);

  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);

  const [voteData, setVoteData] = useState<{
    projectId: number;
    price: number;
  } | null>();

  useEffect(() => {
    setVoteData({
      projectId: Number(formatNumberView(data?.id)),
      price: Number(
        Number(formatNumberView(data?.totalPrice / data.amountPerson)).toFixed(
          2
        )
      ),
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
    if(data.seler === address) {
      console.log("Error")
      return
    }
    await contract.methods
      //investProject(projectId, price)
      .investProject(voteData?.projectId, (voteData?.price as number) * 100)
      .send({
        from: address,
        value: (voteData?.price as number) * 1000000000000000000,
      });
  };

  return (
    <article className="team-card">
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
          Total: <span>{formatNumberView(data.totalPrice)} BNB</span>
        </p>
        <p className="team-card__mail">
          Max person: <span>{formatNumberView(data.amountPerson)}</span>
        </p>
        <button
          className="team-card__btn primary-btn"
          onClick={() => handleInvest()}
        >
          Vote
        </button>
      </div>
    </article>
  );
}

export default CardProject;
