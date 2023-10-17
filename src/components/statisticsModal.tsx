import Image from 'next/image';

const StatisticsModal = (props) => {
  const { data } = props;
  const keyNames = {
    redirect: 'Redirects',
    'short-url': 'Short Links',
    monitor: 'Monitorings',
    members: "Team Members"
  };

  if (!data && data.length === 0) return;

  return (
    <div className="my-2 bg-white shadow-sm z-10 flex-col">
      {Object.keys(keyNames).map((key, index) => {
        const category = data[0].summary.filter(({ category }) => category === key);
        const value = category?.[0]?.used || 0;

        return (
          <div className="flex items-center p-3 hover:bg-slate-100 border-b-2 justify-between" key={`${key}-${index}`}>
            <span>{`${keyNames[key]}: ${value}`}</span>
            <Image className="rounded-full" width="20" height="20" alt={"plus"} src={'/plus-circle.png'} />
          </div>
        )
      })}
    </div>
  );
};

export default StatisticsModal;
