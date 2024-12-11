import type { Meta } from "@storybook/react";
import React, { useState } from "react";
import { GroupTabs } from "./group-tabs";
import { Surface } from "../components/surface";

const meta = {
  title: "Parts/Group Tabs",
  component: GroupTabs,
} satisfies Meta<typeof GroupTabs>;

export default meta;

export const GroupTabsExample = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>(
    "intermediate-products",
  );

  return (
    <Surface color="blackLight" shadow="topglow-2" className="p-2">
      <GroupTabs
        gridWidth={5}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
      />
      {selectedGroup}
    </Surface>
  );
};
