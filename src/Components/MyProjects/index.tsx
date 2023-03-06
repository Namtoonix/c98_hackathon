import Main from "./features/Main";

interface IProps {
  typeView: string;
  id?: string;
}

function MyProjects(props: IProps) {
  const { id, typeView } = props;
  return <Main id={id} typeView={typeView} />;
}

export default MyProjects;
