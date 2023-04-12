import { firestore } from "@/lib/firebase";
import { collection, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  return (
    <div className="fixed h-20 bg-cyan-900 w-screen">
      <div className="flex items-center h-full w-full p-5">
        <Link className="text-3xl text-white font-bold" href="/">
          Prüfungsvorbereitung
        </Link>
        <form onSubmit={() => console.log("Worked")} className="ml-auto">
          <input
            type="text"
            placeholder="Themen oder Inhalte suchen"
            className="border-none w-56 p-2 outline-none rounded-md"
          />
        </form>
      </div>
    </div>
  );
}

export default function Navmenu() {
  return (
    <aside className="fixed w-min z-10 mt-20 bg-cyan-900 h-screen text-white p-5 overflow-x-hidden">
      <h1 className="text-3xl font-semibold p-2">Themen</h1>

      <Accordion title="Abschlussprüfung Teil 1" />
      <Accordion title="Abschlussprüfung Teil 2" />
    </aside>
  );
}

function Accordion({ title, content }: any) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex text-2xl cursor-pointer p-3 gap-3 hover:bg-slate-900 rounded-xl"
      >
        <div>{title}</div>
        {!isActive && <FontAwesomeIcon icon={faSortDown} />}
      </div>
      {isActive && (
        <div>
          <Themenbereich title="BWL" area={title} />
          <Themenbereich title="Projektmanagement" area={title} />
          <Themenbereich title="Anwendungsentwicklung" area={title} />
          <Themenbereich title="Netzwerke" area={title} />
          <Themenbereich title="Hardware" area={title} />
        </div>
      )}
    </div>
  );
}

function Themenbereich({ title, area }: any) {
  const colRef = collection(firestore, "themen");
  const q = query(
    colRef,
    where("bereich", "==", title),
    where("zeitraum", "==", area)
  );
  const [themen] = useCollection(q);

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex gap-3 text-xl p-3 items-center cursor-pointer hover:bg-slate-900 rounded-xl"
      >
        <div>{title}</div>
        {!isActive && <FontAwesomeIcon icon={faSortDown} />}
      </div>

      {isActive &&
        themen?.docs.map((doc) => (
          <div key={doc.id}>
            <Link
              href={`/themen/${doc.id}`}
              className="text-lg p-5 hover:text-gray-400"
            >
              {doc.data().name}
            </Link>
          </div>
        ))}
    </div>
  );
}
