'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from 'next/image';
import WorkSpaceModal from "@/components/workspaceModal";
import StatisticsModal from "@/components/statisticsModal";
import links from '../mock/links';
import mock from '../mock/responseExample';

export default function Home() {
  const [showPortal, setShowPortal] = useState(false);
  const [firstDOMNode, setFirstDOMNode] = useState(null);
  const [secondDOMNode, setSecondDOMNode] = useState(null);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  // TODO: When connected remove the mocked data from here.
  const [data, setData] = useState<any[]>(mock);
  
  useEffect(() => {
    setFirstDOMNode(document.getElementById('modal1') || null);
    setSecondDOMNode(document.getElementById('modal2') || null);
  }, []);

  const renderLink = (link:any): any => {
    const { title, iconCode } = link;

    return (
      <li className="flex my-2 p-2 hover:bg-slate-100 cursor-pointer">
        <Image className="mr-4" width="20" height="20" src={`/${iconCode}`} alt={title} />
        <span>{title}</span>
      </li>
    );
  };

  const handleMouseMove = () => {
    // TODO: Remove this comment when connected
    // if (!showPortal && !loading) {
      // fetchData();
      // setLoading(true);
    // }

    setShowPortal(true);
  };

  const handleMouseOver = () => {
    if (showPortal) {
      setShowPortal(false);
    }
    setLoading(false);
  };

  const fetchData = () => {
    const URL = 'https://api.urllize.com/v0.1.3/workspace';
    const parameters = {
      headers: {
        'Authorization': 'Bearer 5|8x4v9zqIkjJF6Pdo1H0zd70pFdUZoBDSGQVsa60V',
      } 
    };

    fetch(URL, parameters)
      .then((response) => response.json())
      .then((data) => {
        // TODO: Validate that data has the right format when connected
        setData(data); 
        setShowPortal(true);
      })
      .catch((error) => console.log('error', error))
      .finally(() => setLoading(false));
  };

  const handleWorkspaceChange = (index: number) => {
    setSelected(index);
  }

  return (
    <div className="container relative flex justify-items-start w-full">
      <div className="bg-white py-8 px-2 w-80">
        <Image className="cursor-pointer" src="/logo.png" alt="logo" width={168} height={40} />
        <div className="border-2 p-4 mt-2 rounded-xl">
          <button className="flex items-center justify-between" onMouseOver={() => handleMouseMove()}>
            <div className="flex">
              <Image className="rounded-full" width="30" height="30" alt={data[selected].name} src={data[selected].headurl} />
              <span className="pt-1 pl-2">{data[selected].name}</span>
            </div>
            <div className="ml-3 pt-1 flex flex-col">
              <Image alt="chevron-up" src="/chevron-up.png" height="15" width="15" />
              <Image alt="chevron-down" src="/chevron-down.png" height="15" width="15" />
            </div>
          </button>
        </div>
        <ul className="min-w-min">
          {links.map((link) => renderLink(link))} 
        </ul>
      </div>
      <div className="relative flex top-24">
        <div className="flex absolute">
          <div className="w-64 m-auto shadow-sm shadow-black/5 z-10" id="modal1" />
          <div className="w-64 m-auto shadow-sm shadow-black/5 z-10" id="modal2" />
          {showPortal && 
            createPortal(
              <WorkSpaceModal 
                data={data} 
                selectedIndex={selected} 
                handleWorkspaceChange={handleWorkspaceChange} 
              />, 
              firstDOMNode, 
              null
            )}
          {showPortal && createPortal(<StatisticsModal data={data} selectedIndex={selected} />, secondDOMNode, null)}
        </div> 
      </div>
      <div className="flex w-full" onMouseOver={() => handleMouseOver()} />
    </div>
  )
}
