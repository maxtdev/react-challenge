import Image from 'next/image';

interface WorkSpaceModalProps {
  data: any[];
  selectedIndex: number;
}

const WorkSpaceModal = (props: WorkSpaceModalProps) => {
  const { data, selectedIndex } = props;

  if (data.length === 0) return;
  
  return (
    <div className="my-2 p-2 bg-white shadow-sm">
      {data.map((element, index) => {
        const isSelectedWorkspace = index === selectedIndex;

        return (
          <div 
            className={`
              p-2 flex justify-between 
              align-middle hover:bg-slate-100 
              w-full cursor-pointer
              ${isSelectedWorkspace ? 'bg-slate-100' : ''}
            `}
            key={`${element.name}`}
          >
            <div className="flex">
              <Image className="rounded-full" width="30" height="30" alt={element.name} src={element.headurl} />
              <span className="pt-1 pl-2">{element.name}</span>
            </div>
            {isSelectedWorkspace && (
              <Image className="justify-end" width="20" height="20" alt={"check"} src={"/check.png"} />
            )}
          </div>
        );
      })}
      <div className="p-2 flex justify-start align-middle hover:bg-slate-100 w-full cursor-pointer" key={"new workspace"}>
        <Image className="rounded-full" width="30" height="30" alt={"plus"} src={'/plus-circle.png'} />
        <span className="pt-1 pl-2 text-blue-500">Create New Workspace</span>
      </div>
    </div>
  );
};

WorkSpaceModal.defaultProps = {
  data: [],
};

export default WorkSpaceModal;
