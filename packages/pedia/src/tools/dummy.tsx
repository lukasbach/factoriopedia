import { FC } from "react";
import { Tool } from "../routes/tool.$tool";

const ToolRender: FC = () => {
  return <div>Hello</div>;
};

export const dummyTool: Omit<Tool, "id"> = {
  title: "Dummmy tool",
  icon: ["item", "heating-tower"],
  render: ToolRender,
};
