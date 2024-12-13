import { FC, ReactNode } from "react";
import { Surface } from "@factorioui/components";

export const TwoColumnContainer: FC<{ left: ReactNode; right: ReactNode }> = ({
  left,
  right,
}) => {
  return (
    <>
      <Surface
        color="blackDark"
        shadow="inset-1"
        className="h-full flex flex-col"
      >
        {left}
      </Surface>
      <Surface
        color="blackDark"
        shadow="inset-1"
        className="grow h-full overflow-auto"
      >
        {right}
      </Surface>
    </>
  );
};
