import Image from 'next/image';

interface summaryItemI {
  category: string;
  used: number;
}
interface WorkspaceI {
  summary: summaryItemI[];
}
interface StatisticsModalProps {
  data: WorkspaceI[];
  selectedIndex: number;
}

type Keys = 'redirect' | 'short-url' | 'monitor' | 'members';

const keyNames: {
  [key in Keys]: string
} = {
  redirect: 'Redirects',
  'short-url': 'Short Links',
  monitor: 'Monitorings',
  members: "Team Members"
};

const StatisticsModal = (props: StatisticsModalProps) => {
  const { data, selectedIndex } = props;

  if (data.length === 0) return;

  return (
    <div className="my-2 bg-white shadow-sm z-10 flex-col">
      {Object.keys(keyNames).map((key, index) => {
        const category = data[selectedIndex].summary.filter(({ category }) => category === key);
        const value = category?.[0]?.used || 0;

        return (
          <div className="flex items-center p-3 hover:bg-slate-100 border-b-2 justify-between cursor-pointer" key={`${key}-${index}`}>
            <span>{`${keyNames[key]}: ${value}`}</span>
            <Image className="rounded-full" width="20" height="20" alt={"plus"} src={'/plus-circle.png'} />
          </div>
        )
      })}
    </div>
  );
};

StatisticsModal.defaultProps = {
  data: [],
};

export default StatisticsModal;
