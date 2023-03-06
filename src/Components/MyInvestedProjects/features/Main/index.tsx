/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from "react";
import NoData from "../../../NoData";

import { GRID_VIEW } from "../../../../pages/MyProjectsPage/constants";
import image from "../../../../assets/images/shibainu.jpeg";
import CardProject from "../../../CardProject";
import "./styles.scss";

import { Link } from "react-router-dom";
import { formatNumberView } from "../../../../hooks";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../constant";
import { useAccount, useContractRead } from "wagmi";

interface IProps {
  typeView: string;
  id?: string;
}

function Main(props: IProps) {
  const { typeView } = props;
  const { address } = useAccount();
  // Read List Project
  const { data: listCreatedProjects }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getMemberProject",
    args: [address],
  });

  const useEffectDidMout = (effect: EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectDidMout(() => {
    apiFetchList();
  });

  const apiFetchList = async () => {};

  return (
    <div className="relative">
      {listCreatedProjects?.length ? (
        typeView === GRID_VIEW ? (
          <div className="flex flex-wrap">
            {listCreatedProjects.map(
              (project: Record<string, any>, index: number) => (
                <div
                  key={index}
                  className="w-1/4 hover:scale-105 duration-300 cursor-pointer bg-white rounded-xl"
                >
                  <Link to={`${formatNumberView(project.id)}`}>
                    <CardProject
                      data={project}
                      className="!p-[12px] border-[1px] rounded-xl"
                      isOwner
                    />
                  </Link>
                </div>
              )
            )}
          </div>
        ) : (
          <>
            <table>
              <tr className="border-b-[1px] border-b-[#ccc] rounded-xl">
                <th className="w-[20%] py-[8px]">Image</th>
                <th className="w-[20%] py-[8px]">Name</th>
                <th className="w-[40%] py-[8px]">Desctiption</th>
                <th className="w-[20%] py-[8px]">Status</th>
              </tr>
              {listCreatedProjects.map(
                (project: Record<string, any>, index: number) => (
                  <tr
                    key={project.id}
                    className={`border-b-[1px] border-b-[#ccc]`}
                  >
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <div className="team-card__img-box px-[12px]">
                          <img
                            className="team-card__img"
                            src={image}
                            alt="Close-Up Photography of Giraffe"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <span>{project.name}</span>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center description">
                        {project.description}
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <span>{project.overview}</span>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </table>
          </>
        )
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Main;
