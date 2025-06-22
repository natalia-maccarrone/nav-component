"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { NavButton } from "./NavButton";
import { PageInsertDivider } from "./PageInsertDivider";
import {
  DndContext,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { FormPage } from "@/types";

interface AddPageButtonProps {
  formPages: FormPage[];
  setFormPages: (pages: FormPage[]) => void;
}

function AddPageButton({ formPages, setFormPages }: AddPageButtonProps) {
  const handleAddPage = () => {
    const newPage: FormPage = {
      id: crypto.randomUUID(),
      name: "New Page",
      isSortable: true,
    };

    setFormPages([
      ...formPages.slice(0, -1),
      newPage,
      formPages[formPages.length - 1],
    ]);
  };

  return (
    <>
      <PageInsertDivider
        insertIndex={formPages.length - 1}
        formPages={formPages}
        setFormPages={setFormPages}
        allowAddingPage={false}
      />
      <NavButton
        isActive={false}
        onClick={handleAddPage}
        pageName="Add Page"
        className="bg-white text-zinc-900 outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200 hover:bg-white hover:text-zinc-900"
        pageId={`add-page-${Date.now()}`}
        isSortable={false}
      />
    </>
  );
}

interface NavigationBarProps {
  currentPageId: string;
}

export function NavigationBar({ currentPageId }: NavigationBarProps) {
  const router = useRouter();
  const [formPages, setFormPages] = useState<FormPage[]>([
    {
      id: "2aebd922-84ae-43d8-be5d-0739a9a54b83",
      name: "Info",
      isSortable: false,
    },
    {
      id: "0b5fcbea-c689-401d-93ef-849bfd7fad62",
      name: "Details",
      isSortable: true,
    },
    {
      id: "c5b4a914-9a9b-4f3d-b9bf-b887e28696ac",
      name: "Other",
      isSortable: true,
    },
    {
      id: "f65ad7b4-c7e6-4d8b-afce-6100e69601bf",
      name: "Email",
      isSortable: true,
    },
    {
      id: "d1cb62a3-a585-4a71-abaa-5c85ee7cbe3d",
      name: "Phone",
      isSortable: true,
    },
    {
      id: "1587a9c4-be34-4c67-be83-aa396b4fbe70",
      name: "Ending",
      isSortable: false,
    },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = formPages.findIndex((page) => page.id === active.id);
      const overIndex = formPages.findIndex((page) => page.id === over.id);

      if (
        activeIndex === 0 ||
        overIndex === 0 ||
        activeIndex === formPages.length - 1 ||
        overIndex === formPages.length - 1
      ) {
        return;
      }

      const updatedPages = arrayMove([...formPages], activeIndex, overIndex);
      setFormPages(updatedPages);
    }
  }

  const sortableItemsIds = useMemo(() => {
    return formPages.map((page) => page.id);
  }, [formPages]);

  console.log(sortableItemsIds);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
      collisionDetection={closestCenter}
    >
      <div className="flex items-center justify-center">
        <SortableContext
          items={sortableItemsIds}
          strategy={horizontalListSortingStrategy}
        >
          {formPages.map((page, index) => {
            const isActive = page.id === currentPageId;

            return (
              <React.Fragment key={page.id}>
                <NavButton
                  isActive={isActive}
                  onClick={() => router.push(`/editor/${page.id}`)}
                  pageName={page.name}
                  pageId={page.id}
                  isSortable={page.isSortable}
                />

                {index < formPages.length - 1 && (
                  <PageInsertDivider
                    insertIndex={index + 1}
                    formPages={formPages}
                    setFormPages={setFormPages}
                    allowAddingPage
                  />
                )}
              </React.Fragment>
            );
          })}
        </SortableContext>

        <AddPageButton formPages={formPages} setFormPages={setFormPages} />
      </div>
    </DndContext>
  );
}
