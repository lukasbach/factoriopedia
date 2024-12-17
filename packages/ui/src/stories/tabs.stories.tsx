import type { Meta } from "@storybook/react";
import { Surface } from "../components/surface";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "../components/tabs";

const meta = {
  title: "Components/Tabs",
} satisfies Meta;

export default meta;

export const BasicTabs = () => (
  <TabsRoot defaultValue="2">
    <Surface color="blackDark" shadow="inset-1" className="px-2 pt-2">
      <TabsList>
        <TabsTrigger value="1">Manage</TabsTrigger>
        <TabsTrigger value="2">Install</TabsTrigger>
        <TabsTrigger value="3">Updates</TabsTrigger>
      </TabsList>
    </Surface>
    <Surface color="blackMedium" shadow="topglow-1">
      <TabsContent value="1">Manage</TabsContent>
      <TabsContent value="2">Install</TabsContent>
      <TabsContent value="3">Updates</TabsContent>
    </Surface>
  </TabsRoot>
);
