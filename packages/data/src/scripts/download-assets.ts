import tarInstall from "tar-install";
import * as fs from "fs-extra";
import path from "node:path";
import url from "node:url";

const targetFolder = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../data",
);
const tempFolder = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../temp",
);

await fs.ensureDir(targetFolder);
await fs.ensureDir(tempFolder);
const data = await fetch("https://registry.npmjs.org/@factorioui/data").then(
  (res) => res.json(),
);
const version = data["dist-tags"].latest;
// const { tarball } = data.versions[version].dist;
// const response = await fetch(tarball);
// const buffer = await response.arrayBuffer();
// const zip = new Uint8Array(buffer);
// await fs.outputFile("data.tgz", zip);
await tarInstall(data.versions[version].dist.tarball, tempFolder);
await fs.move(path.join(tempFolder, `data-${version}`, "data"), targetFolder, {
  overwrite: true,
});
await fs.remove(tempFolder);
