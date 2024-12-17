import type { Meta } from "@storybook/react";
import React, { useState } from "react";
import { EntityGrid } from "../parts/entity-grid";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { Surface } from "../components/surface";
import { GroupTabs } from "../parts/group-tabs";
import { TooltipRoot } from "../components/tooltip-root";
import { EntityButton } from "../parts/entity-button";

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
        onClick={setSelected}
        items={[
          [
            { name: "nauvis", type: "planet" },
            { name: "fulgora", type: "planet" },
            { name: "aquilo", type: "planet" },
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
        items={useResolveJointItemEntries({
          group: selectedGroup,
          types: ["item", "tool", "recipe"],
        })}
      />
      <TooltipRoot />
    </div>
  );
};

export const EntityButtonWithSubtext = () => {
  return (
    <div>
      <Surface color="blackDark" shadow="inset-1" className="p-2">
        <EntityButton name="nauvis" type="planet" subtext="2" />
        <EntityButton name="fulgora" type="planet" subtext="32x" />
        <EntityButton name="vulcanus" type="planet" subtext="only" />
        <EntityButton
          name="nauvis"
          type="planet"
          subtext="2"
          onClick={console.log}
        />
        <EntityButton
          name="fulgora"
          type="planet"
          subtext="32x"
          onClick={console.log}
        />
        <EntityButton
          name="vulcanus"
          type="planet"
          subtext="only"
          onClick={console.log}
        />
        <EntityButton name="nauvis" type="planet" subtext="2" dark />
        <EntityButton name="fulgora" type="planet" subtext="32x" dark />
        <EntityButton name="vulcanus" type="planet" subtext="only" dark />
      </Surface>
    </div>
  );
};
