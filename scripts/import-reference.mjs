// One-time mechanical import of the verified copy from our existing Framer scripts.
// No Framer connection or external mutations are made by this script.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import vm from "node:vm";
const identity = new Proxy({}, { get: (_, key) => String(key) });
const copy = {};
const commands = [];
const context = vm.createContext({
  state: { phase1Ids: identity, fullHomeResult: { renamedIds: identity } },
  console: { log() {} },
  framer: {
    agent: {
      applyChanges: async (dsl) => {
        commands.push(dsl);
        return { renamedIds: {} };
      },
    },
  },
});
for (const file of [
  "framer-english-copy.js",
  "framer-final-verification-pass.js",
]) {
  await vm.runInContext(
    `(async()=>{${await readFile(file, "utf8")}\n})()`,
    context,
  );
}
for (const command of commands.join("\n").split("\n")) {
  const id = command.match(/^(?:SET|\+RichTextNode)\s+(\S+)/)?.[1];
  const value = command.match(/\btext=("(?:[^"\\]|\\.)*")/);
  if (id && value) copy[id] = JSON.parse(value[1]);
}
await mkdir("src/content", { recursive: true });
await writeFile("src/content/copy.json", JSON.stringify(copy, null, 2) + "\n");
console.log(`Imported ${Object.keys(copy).length} verified copy fields.`);
