import { FormPage } from "@/types";
import { useDndMonitor } from "@dnd-kit/core";
import clsx from "clsx";
import { useState } from "react";

interface DashProps {
  size?: "short" | "long";
  className?: string;
}

const Dash = ({ size = "short", className }: DashProps) => {
  const width = size === "short" ? "w-0.5" : "w-1";

  return (
    <div
      className={clsx(
        `${width} h-[1.50px] relative border border-stone-300`,
        className
      )}
    />
  );
};

interface HoverDashesProps {
  count?: number;
}

const HoverDashes = ({ count = 4 }: HoverDashesProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Dash key={i} size="long" className="hidden group-hover:block" />
      ))}
    </>
  );
};

interface AddButtonProps {
  onAdd: () => void;
}

const AddButton = ({ onAdd }: AddButtonProps) => {
  return (
    <div className="absolute w-full h-6" onClick={onAdd}>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 p-2 rounded-full border border-stone-300 flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 bg-white">
        <div className="text-black text-xs">+</div>
      </div>
    </div>
  );
};

interface PageInsertDividerProps {
  insertIndex: number;
  formPages: FormPage[];
  setFormPages: (pages: FormPage[]) => void;
  allowAddingPage: boolean;
}

export const PageInsertDivider = ({
  insertIndex,
  formPages,
  setFormPages,
  allowAddingPage,
}: PageInsertDividerProps) => {
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragEnd() {
      setIsDragging(false);
    },
  });

  const handleAddPage = () => {
    const newPage = {
      id: crypto.randomUUID(),
      name: "New Page",
      isSortable: true,
    };
    const updatedPages = [...formPages];
    updatedPages.splice(insertIndex, 0, newPage);
    setFormPages(updatedPages);
  };

  const shouldAddDashesOnHover = allowAddingPage && !isDragging;

  return (
    <div
      className={clsx("flex items-center gap-1 group z-10 relative", {
        "cursor-pointer": allowAddingPage,
      })}
    >
      <Dash size="short" />
      <Dash size="long" />

      {shouldAddDashesOnHover && <HoverDashes count={4} />}

      <Dash size="long" />
      <Dash size="short" />

      {allowAddingPage && !isDragging && <AddButton onAdd={handleAddPage} />}
    </div>
  );
};
