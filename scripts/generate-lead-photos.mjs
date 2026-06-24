import { writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Replicate from "replicate";

const replicate = new Replicate();
const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "..", "public", "images", "leads");
await mkdir(outputDir, { recursive: true });

const photos = [
  {
    id: "L002",
    prompt: "Close-up photo taken by a worker on their phone of a broken wooden fence gate hinge. The gate is leaning heavily to one side, the metal hinge is visibly bent and pulling away from the wood post. Canadian suburban backyard, slightly weathered cedar fence. Daylight, realistic cell phone quality photo, slight angle as if taken quickly during a job. Documentary style."
  },
  {
    id: "L004",
    prompt: "Photo taken from the sidewalk of a completely overgrown front lawn at a Canadian suburban home. Weeds are waist-high, dandelions everywhere, no recent mowing. The neighboring houses have well-maintained lawns by contrast. Slightly neglected appearance, mailbox barely visible. Daylight, realistic cell phone quality photo taken by a passing worker."
  },
  {
    id: "L005",
    prompt: "Photo of an old, weathered hot tub sitting in a Canadian suburban backyard. The hot tub cover is cracked and faded, surrounded by overgrown grass. It clearly hasn't been used in years. Some debris and leaves inside. Daylight, realistic cell phone quality photo taken by a service worker assessing the removal job."
  },
  {
    id: "L006",
    prompt: "Close-up photo of a wooden deck with visibly peeling stain on the south-facing boards. The wood grain is showing through, the finish is flaking and sun-damaged. Some boards show gray weathering underneath. Canadian suburban backyard setting. Daylight, realistic cell phone quality photo taken by a worker during lawn service."
  },
  {
    id: "L007",
    prompt: "Photo looking up at a front door of a Canadian home where an outdoor light fixture is hanging loose from the wall. One mounting screw is missing, the fixture is tilted at an angle, wires slightly exposed. Brick exterior wall. Daylight, realistic cell phone quality photo taken by a service worker documenting the issue."
  },
];

console.log("Generating lead observation photos...\n");
for (const photo of photos) {
  console.log(`  Generating: ${photo.id}...`);
  try {
    const output = await replicate.run("google/imagen-4-ultra", {
      input: {
        prompt: photo.prompt,
        aspect_ratio: "4:3",
      },
    });
    const url = output.url();
    console.log(`    URL: ${url}`);
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(join(outputDir, `${photo.id}.jpg`), buffer);
    console.log(`    Saved: ${photo.id}.jpg`);
  } catch (err) {
    console.error(`    ERROR: ${err.message}`);
  }
}

console.log("\nDone! Lead photos generated.");
