import Image from 'next/image';

const WorkSpaceModal = (props) => {
  const { data } = props;
  if (!data || data.length === 0) return;
  
  console.log('a', data);

  return (
    <div className="my-2 p-2 bg-white shadow-sm">
      {data.map((element) => {
        return (
          <div className="p-2 flex justify-start align-middle hover:bg-slate-100 w-full" key={`${element.name}`}>
            <Image className="rounded-full" width="30" height="30" alt={element.name} src={element.headurl} />
            <span className="pt-1 pl-2">{element.name}</span>
          </div>
        );
      })}
      <div className="p-2 flex justify-start align-middle hover:bg-slate-100 w-full" key={"new workspace"}>
        <Image className="rounded-full" width="30" height="30" alt={"plus"} src={'/plus-circle.png'} />
        <span className="pt-1 pl-2 text-blue-500">Create New Workspace</span>
      </div>
    </div>
  );
};

export default WorkSpaceModal;
