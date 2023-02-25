import { useRef } from "react";
import "./styles.scss";
import CardList from "../CardList";

function FormCreate() {
  const container: any = useRef();

  const handleCreateProject = () => {
    container.current &&
      container.current.classList.remove("right-panel-active");
  };

  const handleViewProject = () => {
    container.current && container.current.classList.add("right-panel-active");
  };

  return (
    <div className="flex justify-center w-[768px] relative">
      <div ref={container} className="container right-panel-active">
        <div className="container__form container--signup">
          <form action="#" className="form" id="form1">
            <h2 className="form__title">Create Project</h2>
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              className="input"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              className="input"
            />
            <input
              type="text"
              name="values"
              placeholder="Project Values"
              className="input"
            />
            <input
              type="text"
              name="quantity"
              placeholder="Project Quantity"
              className="input"
            />
            <button className="btn">Create</button>
          </form>
        </div>

        <div className="container__form container--signin">
          <CardList />
        </div>

        <div className="container__overlay">
          <div className="overlay">
            <div className="overlay__panel overlay--left">
              <button className="btn" onClick={handleCreateProject}>
                Create Project
              </button>
            </div>
            <div className="overlay__panel overlay--right">
              <button className="btn" onClick={handleViewProject}>
                View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCreate;
