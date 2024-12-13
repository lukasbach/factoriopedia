import { FC } from "react";
import { EntityButton } from "./entity-button";
import { LocaleName } from "./locale-name";

export const Ingredient: FC<{ name: string; count: number }> = ({
  count,
  name,
}) => {
  return (
    <div className="flex items-center gap-2">
      <EntityButton name={name} type="item" dark />
      <div className="text-white">
        <span className="font-bold">{count} x</span> <LocaleName name={name} />
      </div>
    </div>
  );
};
