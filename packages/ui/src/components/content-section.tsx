import { FC, PropsWithChildren } from "react";
import { Surface } from "./surface";

export const ContentSectionStat = ({
  label,
  children,
}: PropsWithChildren<{ label: string }>) => (
  <p className="flex items-center gap-2">
    <span className="text-textBeige font-bold">{label}:</span>{" "}
    <span>{children}</span>
  </p>
);

export const ContentSection: FC<
  PropsWithChildren<{ title?: string; variant?: "dark" | "flat" }>
> = ({ children, title, variant }) => {
  if (variant === "flat") {
    return (
      <div className="mb-2 text-white border-b-2 border-blackDark">
        {title && <div className="px-2 py-1 font-bold">{title}</div>}
        <div className="px-2 py-1 pb-2">{children}</div>
      </div>
    );
  }

  return (
    <Surface
      color="blackDark"
      shadow="inset-1"
      className="mb-2 text-white rounded"
    >
      {title && (
        <div className="px-2 py-2 border-b-2 border-blackLight text-textYellow font-bold">
          {title}
        </div>
      )}
      <div className="px-2 py-2">{children}</div>
    </Surface>
  );
};
