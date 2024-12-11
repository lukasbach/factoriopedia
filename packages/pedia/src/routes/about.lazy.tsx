import { createLazyFileRoute } from "@tanstack/react-router";

const Page = () => {
  return (
    <div className="p-2">
      <h3>About</h3>
    </div>
  );
};

export const Route = createLazyFileRoute("/about")({
  component: Page,
});
