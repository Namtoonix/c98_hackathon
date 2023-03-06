import Main from "./features/Main";

interface IProps {
  typeView: string;
  id?: string;
}

function MyInvestedProjects(props: IProps) {
  const { id, typeView } = props;
  return <Main id={id} typeView={typeView} />;
}

export default MyInvestedProjects;
