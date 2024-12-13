import { FC, PropsWithChildren, ReactNode } from "react";

export const TechnologyButton: FC<
  PropsWithChildren<{
    subtext?: ReactNode;
    right?: string;
    onClick?: () => void;
  }>
> = ({ children, right, subtext, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group inline w-[100px] h-[140px]"
    >
      <div className="bg-[#00c659] group-hover:bg-[#04db65] group-active:bg-[#03ad50] shadow-technology text-white font-bold">
        <div className="px-2 py-4">{children}</div>
        <div className="bg-[#01711f] h-4 text-right text-xs">{right}</div>
        <div className="bg-[#024d07] h-6 flex justify-center items-center px-1 overflow-hidden">
          {subtext}
        </div>
      </div>
    </button>
  );
};
