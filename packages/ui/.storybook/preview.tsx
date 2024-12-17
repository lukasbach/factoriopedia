import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(Story) => (
    <FactorioDataProvider path="/" loader={<div>Loading...</div>}>
      <Story />
    </FactorioDataProvider>
  )],
};

import "../src/output.css";
import {FactorioDataProvider} from "../src/parts/data-provider";
document.body.style.background = "#242324";

export default preview;
