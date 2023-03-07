import image from "../../../../assets/images/shibainu.jpeg";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import NoData from "../NoData";
import CardProject from "../CardProject";
import { GRID_VIEW } from "../../pages/MyProjectsPage/constants";

interface IProps {
  listCreatedProjects: Array<Record<string, any>>;
  typeView: string;
}

function ProjectList(props: IProps) {
  const { listCreatedProjects, typeView } = props;
  let navigate = useNavigate();

  const goDetail = (id: string) => () => {
    navigate(`${id}/detail`);
  };

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
                  <Link to={`${project.id}/detail`}>
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
                    onClick={goDetail(project.id)}
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

export default ProjectList;
