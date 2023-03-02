/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";

interface IProps {
  height?: string;
}

const Loading = (props: IProps) => {
  const { height } = props;

  return (
    <div style={{ width: "100%", height: height }}>
      <div className="flex items-center translate-x-[-40px] translate-y-[-40px] justify-center w-full h-full">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  height: "100%",
};

export default Loading;
