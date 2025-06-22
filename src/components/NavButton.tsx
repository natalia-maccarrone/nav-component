"use client";

import React from "react";
import clsx from "clsx";
import { DotGridIcon } from "../ui/icons/DotGridIcon";
import { InfoIcon } from "../ui/icons/InfoIcon";
import { DetailsIcon } from "../ui/icons/DetailsIcon";
import { PlusIcon } from "@/ui/icons/PlusIcon";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { DeleteIcon } from "@/ui/icons/DeleteIcon";
import { FlagIcon } from "@/ui/icons/FlagIcon";
import { SquareIcon } from "@/ui/icons/SquareIcon";
import { CopyIcon } from "@/ui/icons/CopyIcon";
import { PencilIcon } from "@/ui/icons/PencilIcon";
import { motion } from "motion/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  pageName: string;
  pageId: string;
  isSortable: boolean;
  className?: string;
}

export function NavButton({
  isActive,
  onClick,
  pageName,
  className,
  pageId,
  isSortable,
}: NavButtonProps) {
  const buttonVariants = {
    default:
      "h-8 px-2.5 bg-gray-400/20 text-slate-500 cursor-pointer inline-flex justify-center items-center gap-2 px-[10px] py-1 rounded-lg text-sm font-medium leading-5",
    active:
      "bg-white text-zinc-900 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200 text-amber-500",
    hover:
      "hover:bg-gray-400/30 hover:text-slate-500 text-slate-500 border-none",
    focus:
      "focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0_0_0_3px_rgb(47_114_226_/_0.3)]",
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: pageId, disabled: !isSortable });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        onClick={onClick}
        className={clsx(
          "z-20 group",
          className,
          buttonVariants.default,
          buttonVariants.hover,
          buttonVariants.focus,
          {
            [buttonVariants.active]: isActive,
          }
        )}
        onMouseUp={(e) => e.currentTarget.blur()}
      >
        <div
          className={clsx("w-5 h-5 group-hover:text-gray-400 item", {
            "text-amber-500": isActive,
          })}
        >
          {["Info", "Ending"].includes(pageName) ? (
            <InfoIcon />
          ) : (
            <>{pageName === "Add Page" ? <PlusIcon /> : <DetailsIcon />}</>
          )}
        </div>
        <div className="text-center">{pageName}</div>
        {isActive && (
          <div className="w-4 h-4 flex-shrink-0">
            <Popover>
              <PopoverTrigger className="cursor-pointer" asChild>
                <div className="cursor-pointer">
                  <DotGridIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                >
                  <div className="self-stretch h-10 p-3 bg-gray-50 border-b-[0.50px] border-neutral-200 inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-center text-zinc-900 text-base font-medium font-bl-melody leading-normal">
                      Settings
                    </div>
                  </div>
                  <div className="self-stretch px-1 pt-1 pb-1.5 inline-flex flex-col justify-start items-start gap-1">
                    {!["Info", "Ending"].includes(pageName) && (
                      <div className="self-stretch inline-flex justify-start items-center gap-1.5 hover:bg-gray-50 p-2 rounded cursor-pointer">
                        <FlagIcon />
                        <div className="flex-1 justify-center text-zinc-900 text-sm font-medium font-inter leading-none">
                          Set as first page
                        </div>
                      </div>
                    )}
                    <div className="self-stretch inline-flex justify-start items-center gap-1.5 hover:bg-gray-50 p-2 rounded cursor-pointer">
                      <PencilIcon />
                      <div className="flex-1 justify-center text-zinc-900 text-sm font-medium font-inter leading-none">
                        Rename
                      </div>
                    </div>
                    <div className="self-stretch inline-flex justify-start items-center gap-1.5 hover:bg-gray-50 p-2 rounded cursor-pointer">
                      <CopyIcon />
                      <div className="flex-1 justify-center text-zinc-900 text-sm font-medium font-inter leading-none">
                        Copy
                      </div>
                    </div>
                    <div className="self-stretch inline-flex justify-start items-center gap-1.5 hover:bg-gray-50 p-2 rounded cursor-pointer">
                      <SquareIcon />
                      <div className="flex-1 justify-center text-zinc-900 text-sm font-medium font-inter leading-none">
                        Duplicate
                      </div>
                    </div>
                    <div className="self-stretch h-[0.50px] relative bg-neutral-200" />
                    <div className="self-stretch inline-flex justify-start items-center gap-1.5 hover:bg-gray-50 p-2 rounded cursor-pointer">
                      <DeleteIcon />
                      <div className="flex-1 justify-center text-red-500 text-sm font-medium font-inter leading-none">
                        Delete
                      </div>
                    </div>
                  </div>
                </motion.div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </motion.button>
    </div>
  );
}
