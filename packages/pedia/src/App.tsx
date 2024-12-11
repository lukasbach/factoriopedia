import { Surface } from "@factorioui/components";

export const App = () => {
  return (
    <Surface
      className="h-full flex items-center justify-center"
      color="blackDark"
    >
      <Surface
        color="blackMedium"
        shadow="topglow-2"
        className="w-[640px] h-[400px] rounded flex gap-2 p-2"
      >
        <Surface color="blackDark" shadow="inset-1" className="w-[250px]">
          Left
        </Surface>
        <Surface color="blackDark" shadow="inset-1" className="grow">
          Right
        </Surface>
      </Surface>
    </Surface>
  );
};
