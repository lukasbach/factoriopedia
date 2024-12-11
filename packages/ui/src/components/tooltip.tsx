import { ReactNode, createContext, useContext } from "react";
import ReactDOMServer from "react-dom/server";

const IsInTooltipContext = createContext(false);
const useIsInTooltip = () => useContext(IsInTooltipContext) || false;

export const tooltip = (
  text: string | ReactNode | null,
  children?: ReactNode,
) => {
  return {
    "data-tooltip-id": "factorio-ui-tooltip",
    "data-tooltip-html": ReactDOMServer.renderToStaticMarkup(
      <IsInTooltipContext.Provider value>
        <div className="min-w-8">
          {text && (
            <div className="bg-textBeige text-black shadow-inset-1 min-w-32 p-0.5 px-2 font-bold mb-[1px]">
              {text}
            </div>
          )}
          {children}
        </div>
      </IsInTooltipContext.Provider>,
    ),
  };
};
