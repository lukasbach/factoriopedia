import { unzip } from "cross-zip";
import * as fs from "fs-extra";
import path from "node:path";
import url from "node:url";

const targetFolder = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../data",
);
const tempFolder = path.join(targetFolder, "temp");

const data = await fetch("https://registry.npmjs.org/@factorioui/data").then(
  (res) => res.json(),
);
const version = data["dist-tags"].latest;
const { tarball } = data.versions[version].dist;
const response = await fetch(tarball);
const buffer = await response.arrayBuffer();
const zip = new Uint8Array(buffer);
await fs.writeFile("data.tgz", zip);
await unzip("data.tgz", tempFolder);
await fs.move(path.join(tempFolder, "data"), targetFolder);
await fs.remove("data.tgz");
await fs.remove(tempFolder);
