/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from "react";
import Loading from "../../../Loading";
import NoData from "../../../NoData";
import { useStore } from "../../context/store";
import { GRID_VIEW } from "../../../../pages/MyProjectsPage/constants";
import image from "../../../../assets/images/shibainu.jpeg";
import CardProject from "../../../CardProject";
import "./styles.scss";

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
  const { state } = useStore();

  const { projects = PROJECTS_DEFAULT, loading } = state;

  const useEffectDidMout = (effect: EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectDidMout(() => {
    apiFetchList();
  });

  const apiFetchList = async () => {};

  return (
    <div className="relative">
      {projects?.length ? (
        typeView === GRID_VIEW ? (
          <div className="flex flex-wrap">
            {projects.map((movie: Record<string, any>, index: number) => (
              <div key={index} className="w-1/4">
                <CardProject data={movie} className="!p-[12px] border-[1px]" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <table>
              <tr className="border-b-[1px] border-b-[#ccc]">
                <th className="w-[20%] py-[8px]">Image</th>
                <th className="w-[20%] py-[8px]">Name</th>
                <th className="w-[40%] py-[8px]">Desctiption</th>
                <th className="w-[20%] py-[8px]">Status</th>
              </tr>
              {projects.map((movie: Record<string, any>, index: number) => (
                <tr key={movie.id} className={`border-b-[1px] border-b-[#ccc]`}>
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
                      <span>{movie.title}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-center description">
                      {movie.description}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center py-[8px] ">
                      <span>{movie.overview}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </>
        )
      ) : (
        <NoData />
      )}
      {loading && (
        <div className="absolute inset-0 bg-[#fffa]">
          <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Loading height="340px" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
