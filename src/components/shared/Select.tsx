"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

const people = [
  {
    id: 1,
    name: "이찬영",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "박원빈",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "송은석",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "소달호",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "정성찬",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "이소희",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "임나연",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "남윤수",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "송강",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "남주혁",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function LSelect() {
  const [selected, setSelected] = useState(people[0]);
  const selectWidth = "!w-[99px]";
  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm/6 font-medium text-gray-900">
        Assigned to
      </Label> */}
      <div className={clsx("relative mt-2 ", selectWidth)}>
        <ListboxButton className="box-border cursor-pointer grid mx-[16px] grid-cols-1 bg-white py-[12px] text-left text-gray-900 border-b-[1px] border-grayscale-100 data-[active]:border-b-0 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-2">
            <span className="ml-1 block truncate text-grayscale-900 text-B4">
              {selected.name}
            </span>
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className={clsx(
            selectWidth,
            " no-scrollbar bg-base-white box-border absolute z-10 max-h-56 overflow-auto rounded-[12px] bg-white py-1 shadow-lg ring-1 ring-gray/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          )}
        >
          {people.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group mx-[16px] mb-[6px] relative cursor-pointer select-none py-[12px] pl-0 pr-2 text-gray-900 border-b-[1px] border-grayscale-100 data-[focus]:bg-gray-600 data-[focus]:text-white data-[focus]:outline-none"
            >
              <div className="flex items-center">
                <span className="ml-1 block truncate text-B4 group-data-[selected]:font-semibold text-grayscale-900">
                  {person.name}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
