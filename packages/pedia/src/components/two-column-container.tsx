import { FC, ReactNode } from "react";
import { Surface } from "@factorioui/components";
import { useMobileMenu } from "./mobile-menu-provider";

export const TwoColumnContainer: FC<{ left: ReactNode; right: ReactNode }> = ({
  left,
  right,
}) => {
  const { isMenuOpen } = useMobileMenu();
  return (
    <>
      <Surface
        color="blackDark"
        shadow="inset-1"
        className={`h-full md:flex flex-col ${isMenuOpen ? "block" : "hidden"}`}
      >
        {left}
      </Surface>
      <Surface
        color="blackDark"
        shadow="inset-1"
        className={`grow h-full overflow-auto md:block ${isMenuOpen ? "hidden" : "block"}`}
      >
        {right}
      </Surface>
    </>
  );
};
