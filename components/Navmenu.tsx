import { firestore } from "@/lib/firebase";
import {
  DocumentData,
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export function Navbar() {
  const [IsSearching, SetIsSearching] = useState(false);

  const [Result, SetResult] = useState<null | DocumentData[]>(null);

  const [SearchInput, SetSearchInput] = useState<null | string>(null);

  const onSubmit = () => {
    if (!SearchInput) {
      SetIsSearching(false);
      return;
    }
    SetIsSearching(true);

    const colRef = collection(firestore, "themen");
    console.log(SearchInput);
    const qry = query(colRef, orderBy("name"));

    getDocs(qry).then((docs) => {
      let results = docs?.docs?.map((doc) => doc.data());

      results = results.filter((result) => result.inhalt.includes(SearchInput));

      SetResult(results);
      console.log(results[0].id);
    });
    return false;
  };

  const onBlur = async () => {
    await new Promise((r) => setTimeout(r, 200));

    SetIsSearching(false);
    SetResult(null);
  };

  return (
    <div className="h-20 bg-bg border-b border-black w-full p-0 m-0">
      <div className="flex items-center h-full w-full p-5">
        <Link className="text-3xl text-white font-bold" href="/">
          Prüfungsvorbereitung
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="ml-auto h-10"
        >
          <div>
            <input
              type="text"
              onChange={(e) => SetSearchInput(e.target.value)}
              onBlur={onBlur}
              placeholder="Themen oder Inhalte suchen"
              className="border-none w-56 p-2 outline-none text-black"
            />
            {IsSearching && Result && (
              <div className="h-8 w-full bg-white border-t border-black text-black flex items-center justify-center">
                {Result.map((doc) => {
                  return (
                    <Link
                      key={doc.id}
                      className="text-blue"
                      href={`/themen/${doc.id}`}
                    >
                      {doc.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Navmenu() {
  return (
    <div className="w-min bg-bg border-r border-black h-full min-w-max text-white p-5 overflow-x-hidden">
      <h1 className="text-3xl font-semibold p-2">Themen</h1>

      <Accordion title="Abschlussprüfung Teil 1" />
      <Accordion title="Abschlussprüfung Teil 2" />
      <div className="mt-auto h-max">
        <a href="https://zaroc.de" className="">
          ZAROC
        </a>
      </div>
    </div>
  );
}

function Accordion({ title, content }: any) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex text-2xl cursor-pointer p-3 gap-3 hover:bg-focus rounded-xl"
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

  const router = useRouter();

  const currentTopic = router.query.thema;

  console.log(currentTopic);

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex gap-3 text-xl p-3 items-center cursor-pointer hover:bg-focus rounded-xl"
      >
        <div>{title}</div>
        {!isActive && <FontAwesomeIcon icon={faSortDown} />}
      </div>

      {isActive &&
        themen?.docs.map((doc) => (
          <div key={doc.id}>
            {currentTopic == doc?.id ? (
              <Link
                href={`/themen/${doc.id}`}
                className="text-lg p-5 hover:text-white text-text"
              >
                {doc.data().name}
              </Link>
            ) : (
              <Link
                href={`/themen/${doc.id}`}
                className="text-lg p-5 hover:text-text"
              >
                {doc.data().name}
              </Link>
            )}
          </div>
        ))}
    </div>
  );
}
