import type { Meta } from "@storybook/react";
import { useState } from "react";
import { EntityGrid } from "./entity-grid";

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
