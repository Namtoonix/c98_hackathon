/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";

interface IProps {
  percent?: number;
}

const Percent = (props: IProps) => {
  const { percent } = props;

  return (
    <div className="single-chart w-[60px] h-[60px]">
      <svg viewBox="0 0 36 36" className="circular-chart orange">
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={`${percent}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage">
          {`${percent}%`}
        </text>
      </svg>
    </div>
  );
};

Percent.defaultProps = {
  percent: 0,
};

export default Percent;
