import { Link, createLazyFileRoute } from "@tanstack/react-router";

const Page = () => {
  return (
    <div className="p-2">
      <Link to="/pedia" className="[&.active]:font-bold">
        Home
      </Link>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Page,
});
