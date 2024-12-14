import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

const Page = () => {
  return (
    <Navigate
      to="/pedia/$type/$name"
      params={{ name: "transport-belt", type: "item" }}
    />
  );
};

export const Route = createLazyFileRoute("/")({
  component: Page,
});
