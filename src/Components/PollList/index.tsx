import { formatNumberView } from "../../hooks";

interface IProps {
  listPoll: Array<Record<string, any>>;
}

function PollList(props: IProps) {
  const { listPoll } = props;

  return (
    <table className="border-[1px] mt-[20px] text-[#fff]">
      <tr className="border-b-[1px] border-b-[#ccc] rounded-xl">
        <th className="w-[20%] py-[8px]">Name</th>
        <th className="w-[30%] py-[8px]">Desctiption</th>
        <th className="w-[15%] py-[8px]">Value</th>
        <th className="w-[15%] py-[8px]">Status</th>
        <th className="w-[20%] py-[8px]">Action</th>
      </tr>
      {listPoll.map((poll: Record<string, any>, index: number) => (
        <tr key={poll.id} className={`border-b-[1px] border-b-[#ccc]`}>
          <td>
            <div className="flex justify-center py-[8px] ">
              <span>{poll.title}</span>
            </div>
          </td>

          <td>
            <div className="flex justify-center description">
              {poll.description}
            </div>
          </td>
          <td>
            <div className="flex justify-center py-[8px] ">
              <span>{formatNumberView(poll.value)}</span>
            </div>
          </td>
          <td>
            <div className="flex justify-center py-[8px] ">
              <span>{poll.status}%</span>
            </div>
          </td>
          <td>
            <div className="flex justify-center py-[8px] ">
              <span>Vote</span>
            </div>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default PollList;
