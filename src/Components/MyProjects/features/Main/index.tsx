/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useContext, useEffect } from "react";
import Loading from "../../../Loading";
import NoData from "../../../NoData";
import { useStore } from "../../context/store";
import { GRID_VIEW } from "../../../../pages/MyProjectsPage/constants";
import image from "../../../../assets/images/shibainu.jpeg";
import CardProject from "../../../CardProject";
import "./styles.scss";
import { Link } from "react-router-dom";
import { formatNumberView } from "../../../../hooks";
import { MyProjectsContext } from "../../context";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../constant";
import { useAccount, useContractRead } from "wagmi";

interface IProps {
  typeView: string;
  id?: string;
}

const PROJECTS_DEFAULT = Array(8).fill({
  image: image,
  title: "Fushionist",
  description:
    "'Fusionist is a scalable and sustainable Sci-Fi universe with a combination of sophisticated game design and deflationary token mechanics. You can command your Bi·Mech in PvP, PvE, and even E-Sports tournaments in Fusionst to earn tokens and other NFT rewards. This NFT collection will have an exclusive coating style - Supreme Dominance, superior attributes, and a higher chance of receiving new weapons when upgrading to become more badass which can be used in Fusionist",
  value: 150000,
  quantity: 12,
});

function Main(props: IProps) {
  const { typeView } = props;
  const { address } = useAccount();

  // Read List Project
  const { data: listCreatedProjects }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getOwnerProject",
    args: [address],
  });

  // read list Project valid to vote

  const { data: listValidProjects }: any = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getOwnerProjectEligible",
    args: [address],
  });

  console.log("listCreatedProjects", listCreatedProjects);
  console.log("listValidProjects", listValidProjects);

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
      {/* {loading && (
        <div className="absolute inset-0 bg-[#fffa]">
          <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Loading height="340px" />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Main;
