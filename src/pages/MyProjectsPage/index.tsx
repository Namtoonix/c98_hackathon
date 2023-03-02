import { useState } from "react";
import GridIcon from "../../Components/icons/GridIcon";
import ListIcon from "../../Components/icons/ListIcon";
import MyProjects from "../../Components/MyProjects";
import { GRID_VIEW, LIST_VIEW } from "./constants";

const MyProjectsPage = () => {
  const [typeView, setTypeView] = useState(GRID_VIEW);

  return (
    <div className="w-full mt-[20px] px-[80px] mb-[20px]">
      <div className="flex justify-between">
        <div className="sm:flex hidden mr-[12px]">
          <span
            className="w-[40px] flex cursor-pointer"
            onClick={() => setTypeView(GRID_VIEW)}
          >
            <GridIcon fill={typeView === GRID_VIEW ? "#0d243f" : "#fff"} />
          </span>
          <span
            className="w-[24px] flex cursor-pointer"
            onClick={() => setTypeView(LIST_VIEW)}
          >
            <ListIcon fill={typeView === LIST_VIEW ? "#0d243f" : "#fff"} />
          </span>
        </div>
      </div>
      <div className="bg-white">
        <MyProjects typeView={typeView} />
      </div>
    </div>
  );
};

export default MyProjectsPage;
