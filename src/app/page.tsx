'use client';

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from 'next/image';
import WorkSpaceModal from "@/components/workspaceModal";
import StatisticsModal from "@/components/statisticsModal";
import links from '../mock/links';
import mock from '../mock/responseExample';

export default function Home() {
  const [showPortal, setShowPortal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>(mock);
  const firstModalDOMNode = document.getElementById('modal1') || null;
  const secondModalDOMNode = document.getElementById('modal2') || null;

  const renderLink = (link:any): any => {
    const { title, iconCode } = link;

    return (
      <li className="flex my-2 p-2 hover:bg-slate-100 cursor-pointer">
        <Image className="mr-4" width="20" height="20" src={`/${iconCode}`} alt={title} />
        <span>{title}</span>
      </li>
    );
  };

  const handleMouseClick = () => {
    // fetchData();
    setShowPortal(true);
  };

  const fetchData = () => {
    const URL = 'https://api.urllize.com/v0.1.3/workspace';
    const parameters = {
      headers: {
        'Authorization': 'Bearer 5|8x4v9zqIkjJF6Pdo1H0zd70pFdUZoBDSGQVsa60V',
      } 
    };

    setLoading(true);

    fetch(URL, parameters)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log('error', error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container relative flex justify-items-start w-full">
      <div className="bg-white py-8 px-2 w-64">
        <Image className="cursor-pointer" src="/logo.png" alt="logo" width={168} height={40} />
        <div className="border-2 p-4 mt-2 rounded-xl">
          <button className="flex align-middle items-center " onClick={() => handleMouseClick()}>
            <span>Selected Workspace</span>
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
      <div className="relative top-24">
        <div className="flex absolute">
          <div className="w-64 m-auto shadow-sm shadow-black/5 z-10" id="modal1" />
          <div className="w-64 m-auto shadow-sm shadow-black/5 z-10" id="modal2" />
          {showPortal && createPortal(<WorkSpaceModal data={data} />, firstModalDOMNode, null)}
          {showPortal && createPortal(<StatisticsModal data={data} />, secondModalDOMNode, null)}
        </div> 
      </div>
    </div>
  )
}
