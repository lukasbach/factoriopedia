import { FC } from "react";
import { EntityButton } from "./entity-button";
import { LocaleName } from "./locale-name";

export const Ingredient: FC<{
  name: string;
  count: number | string;
  label?: string;
  type?: string;
}> = ({ count, name, label, type }) => {
  return (
    <div className="flex items-center gap-2">
      <EntityButton name={name} type={type ?? "item"} dark />
      <div className="text-white">
        <span className="font-bold">
          {count}
          {!label ? " x" : ""}
        </span>{" "}
        {label ?? <LocaleName name={name} />}
      </div>
    </div>
  );
};
