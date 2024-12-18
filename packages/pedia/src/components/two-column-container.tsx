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
        className={`md:flex flex-col max-h-[750px] ${isMenuOpen ? "flex" : "hidden"}`}
      >
        {left}
      </Surface>
      <Surface
        color="blackDark"
        shadow="inset-1"
        className={`grow max-h-[750px] overflow-auto md:block ${isMenuOpen ? "hidden" : "block"}`}
      >
        {right}
      </Surface>
    </>
  );
};
