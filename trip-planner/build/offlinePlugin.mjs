import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Build the offline shell from the actual output, including every split chunk.
export default function offlinePlugin() {
  let root;
  return {
    name: "complete-offline-guide",
    apply: "build",
    configResolved(config) { root = config.root; },
    async writeBundle(options) {
      const dir = path.resolve(root, options.dir || "dist");
      const names = (await readdir(dir, { recursive: true })).filter((name) => /\.(html|js|css|json|png|svg|woff2)$/.test(name) && name !== "sw.js").sort();
      const digest = createHash("sha256");
      for (const name of names) digest.update(name).update(await readFile(path.join(dir, name)));
      const source = await readFile(path.join(root, "public/sw.js"), "utf8");
      digest.update(source);
      const output = source.replace('"development"', JSON.stringify(digest.digest("hex").slice(0, 16)))
        .replace('["./", "./index.html", "./manifest.json"]', JSON.stringify(["./", ...names.map((name) => `./${name}`)]));
      await writeFile(path.join(dir, "sw.js"), output);
    },
  };
}
