import { MyProjectsProvider } from "./context";
import Main from "./features/Main";

interface IProps {
  typeView: string;
  id?: string;
}

function MyProjects(props: IProps) {
  const { id, typeView } = props;
  return (
    <MyProjectsProvider>
      <Main id={id} typeView={typeView} />
    </MyProjectsProvider>
  );
}

MyProjects.defaultProps = {
  id: "",
};

export default MyProjects;
