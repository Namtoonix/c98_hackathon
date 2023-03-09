import { ethers } from "ethers";
import { formatNumberView } from "../../hooks";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constant";
import Web3 from "web3";

declare const window: any;

interface IProps {
  listPoll: Array<Record<string, any>>;
  isOwner?: boolean;
}

function PollList(props: IProps) {
  const { listPoll, isOwner } = props;

  //  //Create project
  //  const { config: configLong } = usePrepareContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: CONTRACT_ABI,
  //   functionName: "voteProject",
  //   args: [
  //    2,
  //     0
  //   ],
  //   // onSuccess() {
  //   //   toast.success("Project initialization successful!");
  //   // },
  // });

  // const {
  //   data: createData,
  //   isLoading: isCreateLoading,
  //   isSuccess: isCreateSuccess,
  //   write: voteProject,
  // } = useContractWrite(configLong);

  const { address } = useAccount();

  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(CONTRACT_ABI as any, CONTRACT_ADDRESS);

  const handeVote = async (id: number, vote: number) => {
    await contract.methods
      //investProject(projectId, price)
      .voteProject(id, vote)
      .send({
        from: address,
      });
  };

  return (
    <table className="border-[1px] mt-[20px] text-[#fff]">
      <tr className="border-b-[1px] border-b-[#ccc] rounded-xl">
        <th className="w-[20%] py-[8px]">Title</th>
        <th className="w-[30%] py-[8px]">Expiration date</th>
        <th className="w-[15%] py-[8px]">Value</th>
        <th className="w-[15%] py-[8px]">Status</th>
        {!isOwner && <th className="w-[20%] py-[8px]">Action</th>}
      </tr>
      {listPoll?.map((poll: Record<string, any>, index: number) => (
        <tr key={index} className={`border-b-[1px] border-b-[#ccc]`}>
          <td>
            <div className="flex justify-center py-[8px] ">
              <span>{poll?.title}</span>
            </div>
          </td>
          <td>
            <div className="flex justify-center description">{poll?.value}</div>
          </td>
          <td>
            <div className="flex justify-center description">
              {poll?.expirationDate}
            </div>
          </td>
          <td>
            <div className="flex justify-center py-[8px] ">
              <span>
                {Number(
                  (ethers.utils.formatEther(poll?.status) as any) * 1e18
                ) === 1
                  ? "Successful"
                  : "Unsuccessful"}
              </span>
            </div>
          </td>
          {!isOwner && (
            <td>
              <div className="flex justify-center gap-2 py-[8px]">
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    handeVote(
                      Number(
                        (ethers.utils.formatEther(poll?.id) as any) * 1e18
                      ),
                      1
                    )
                  }
                >
                  Yes{" "}
                </span>{" "}
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    handeVote(
                      Number(
                        (ethers.utils.formatEther(poll?.id) as any) * 1e18
                      ),
                      0
                    )
                  }
                >
                  {" "}
                  No
                </span>
              </div>
            </td>
          )}
        </tr>
      ))}
    </table>
  );
}

export default PollList;
