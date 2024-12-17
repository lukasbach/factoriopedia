import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import { Table } from "@factorioui/components";
import { createColumnHelper } from "@tanstack/react-table";
import { TwoColumnContainer } from "../components/two-column-container";
import { urls } from "../urls";

export const Route = createLazyFileRoute("/about")({
  component: Page,
});

type Url = {
  title: string;
  url: string;
};

const data: Url[] = [
  {
    title: "Github Repository",
    url: urls.repo,
  },
  {
    title: "Follow me on Github",
    url: urls.ghuser,
  },
  {
    title: "My Homepage",
    url: urls.homepage,
  },
  {
    title: "Factorio UI Components Storybook",
    url: urls.storybook,
  },
];

const columnHelper = createColumnHelper<Url>();
const columns = [
  columnHelper.accessor("title", {
    header: () => "Relevant Links",
  }),
];

function Page() {
  const navigate = useNavigate();
  return (
    <TwoColumnContainer
      left={
        <div className="w-96">
          <Table
            columns={columns}
            onClickCell={(row) => {
              navigate({
                to: row.original.url,
              });
            }}
            data={data}
          />
        </div>
      }
      right={
        <div className="p-2 px-4">
          <p className="mb-2">
            The primary goal of this project was to experiment with the Factorio
            Datadump, and build something nice looking that reflects the
            beautiful UI design that Factorio uses.
          </p>
          <p className="mb-2">
            The app uses the JSON data dump provided by the Factorio binary in
            Space Age. There are still some bugs and issues in how data is
            interpreted from the Factorio data dump, and some pieces of
            information are missing since they simply not present in the data
            dump.
          </p>
          <p className="mb-2">
            If this tool was helpful to you, please consider{" "}
            <Link
              to={urls.repo}
              target="_blank"
              className="text-textBlue font-bold underline"
            >
              starring the repository on Github
            </Link>
            .
          </p>
          <p className="mb-2">
            By the way, I made the UI components used in this project, including
            a Frontend Provider that makes the entire Factorio JSON Data and
            assets available in the browser, available as React components that
            you can use yourself in your own projects. They are deployed on npm
            in the package{" "}
            <span className="text-textYellow font-bold">
              @factorioui/components
            </span>{" "}
            and can be imported from there.
          </p>
          <p className="mb-2">
            You can find the Storybook for these components{" "}
            <Link
              to={urls.storybook}
              target="_blank"
              className="text-textBlue font-bold underline"
            >
              here
            </Link>
            .
          </p>
        </div>
      }
    />
  );
}
