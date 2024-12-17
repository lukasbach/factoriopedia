import { FC } from "react";
import { Tool } from "../routes/tool.$tool";

const ToolRender: FC = () => <div>Hello</div>;

export const solarratio: Omit<Tool, "id"> = {
  title: "Ratio Calculator for Solar Panels",
  icon: ["item", "solar-panel"],
  render: ToolRender,
};
