# Factoriopedia

Visit now at [factoriopedia.lukasbach.com](https://factoriopedia.lukasbach.com/)!

This is a recreation of the Factoriopedia utility in the PC Game Factorio
Space Age, as well as several other tools that are included that may be helpful
to other players. It also includes a full list of all technologies in the game.

The app is built on a data dump of the game, created by the Factorio binary.

This repo also contains the tooling to create the data dump, as well as the
UI components used for Factoriopedia as reusable React components that can be
used by the community for other projects. You can find out more about that
[here](https://factoriopedia.lukasbach.com/storybook/?path=/docs/documentation-introduction--docs).

## App Screenshots

![Screenshot](https://imgur.com/M2FE87V.png)

![Screenshot](https://imgur.com/BfZFguK.png)

![Screenshot](https://imgur.com/vZ8CrI4.png)

![Screenshot](https://imgur.com/hFZPU3u.png)

## UI Components Screenshots

![Screenshot](https://imgur.com/xam62go.png)

![Screenshot](https://imgur.com/nB8Y2WJ.png)

## Contributing

Install volta, then call `yarn` to install all dependencies.
Use `yarn build` to build all packages, and `yarn dev` to start
the local dev server and storybook.

You will need the Factorio data included in the repo for the app
to run, which is not included in the repo. You can

- Run a JSON data + locales + assets export with the Factorio binary,
  place the data in the `packages/data/script-output` folder and
  run `yarn reparse` to generate the data, or
- Run `yarn download-data` to download the latest data from the
  NPM data package.

Before contributing a PR, please run `yarn lint` to ensure your
code matches the linting rules.