import type { Meta } from "@storybook/react";
import React, { useState } from "react";
import { EntityGrid } from "./entity-grid";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { Surface } from "../components/surface";
import { GroupTabs } from "./group-tabs";
import { TooltipRoot } from "../components/tooltip-root";

const meta = {
  title: "Parts/Entity Grid",
  component: EntityGrid,
} satisfies Meta<typeof EntityGrid>;

export default meta;

export const WithHardcodedContents = () => {
  const [selected, setSelected] = useState<any>(undefined);
  return (
    <>
      <EntityGrid
        gridWidth={8}
        activeItem={selected}
        onClick={(type, name) => setSelected({ type, name })}
        items={[
          [
            { type: "planet", name: "nauvis" },
            { type: "planet", name: "vulcanus" },
            { type: "planet", name: "gleba" },
            { type: "planet", name: "fulgora" },
          ],
        ]}
      />
      {JSON.stringify(selected)}
    </>
  );
};

export const AllItemsInGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>(
    "intermediate-products",
  );
  return (
    <div>
      <Surface color="blackLight" shadow="topglow-2" className="p-2">
        <GroupTabs
          gridWidth={6}
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />
        {selectedGroup}
      </Surface>
      <EntityGrid
        gridWidth={10}
        gridHeight={10}
        items={Object.values(
          useResolveJointItemEntries({
            group: selectedGroup,
            types: ["item", "tool", "recipe"],
          }),
        ).map((subgroup) =>
          subgroup.map((item) => ({ type: item.type, name: item.name })),
        )}
      />
      <TooltipRoot />
    </div>
  );
};
