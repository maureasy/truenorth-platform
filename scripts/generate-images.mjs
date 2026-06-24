import { writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Replicate from "replicate";

const replicate = new Replicate();
const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "..", "public", "images");
await mkdir(`${outputDir}/people`, { recursive: true });
await mkdir(`${outputDir}/assets`, { recursive: true });
await mkdir(`${outputDir}/services`, { recursive: true });

const people = [
  {
    id: "p1",
    name: "Sarah Chen",
    prompt: "Professional headshot of a friendly Asian Canadian woman in her late 20s, wearing a branded teal polo shirt with a small company logo. She has shoulder-length black hair pulled back, warm smile, clean background. Natural daylight, high quality portrait photography, shallow depth of field. She's a residential cleaning professional."
  },
  {
    id: "p2",
    name: "Marcus Okafor",
    prompt: "Professional headshot of a fit Black Canadian man in his early 30s, wearing a branded green work polo shirt. He has a short fade haircut, confident smile, outdoor background slightly blurred (lawn/garden). Natural sunlight, high quality portrait photography. He's a lawn care and landscaping professional."
  },
  {
    id: "p3",
    name: "Elena Rostova",
    prompt: "Professional headshot of a Eastern European Canadian woman in her mid-30s, wearing a branded navy work jacket. She has light brown hair in a practical ponytail, determined expression with a slight smile, construction site slightly blurred in background. Natural light, high quality portrait photography. She's a deck and fence construction specialist."
  },
  {
    id: "p4",
    name: "Dave Kim",
    prompt: "Professional headshot of a Korean Canadian man in his early 40s, wearing a branded grey work shirt with tool belt visible. He has short black hair, friendly approachable smile, workshop blurred in background. Warm lighting, high quality portrait photography. He's a skilled handyman and general contractor."
  },
  {
    id: "p5",
    name: "Aisha Patel",
    prompt: "Professional headshot of a South Asian Canadian woman in her late 20s, wearing a branded teal polo shirt. She has long dark hair tied back neatly, bright warm smile, clean modern home interior blurred in background. Soft natural light, high quality portrait photography. She's a residential cleaning specialist."
  },
  {
    id: "p6",
    name: "Liam Torres",
    prompt: "Professional headshot of a mixed-race Latino Canadian man in his mid-20s, wearing a branded green work t-shirt. He has wavy brown hair, youthful energetic smile, outdoor garden/yard blurred in background. Golden hour sunlight, high quality portrait photography. He's a lawn care and snow removal professional."
  },
];

const assets = [
  {
    id: "a1",
    name: "van-12",
    prompt: "A clean white Ford Transit cargo van with teal accent stripes and a small 'TrueNorth' logo on the side, parked in a suburban Canadian driveway. The van is well-maintained, professional-looking service vehicle. Sunny day, residential neighborhood background. High quality commercial photography."
  },
  {
    id: "a2",
    name: "truck-101",
    prompt: "A white Ford F-150 pickup truck with green accent stripes and lawn care equipment visible in the truck bed (trimmer, blower). Small company logo on the door. Parked on a suburban Canadian street with green lawns. Sunny day, high quality commercial photography."
  },
  {
    id: "a3",
    name: "mower-pro",
    prompt: "A professional commercial zero-turn riding lawn mower (John Deere or similar style, green/yellow), on a freshly mowed large residential lawn in a Canadian suburb. Clean, well-maintained equipment. Bright daylight, high quality product photography."
  },
  {
    id: "a4",
    name: "pressure-washer",
    prompt: "A professional-grade gas pressure washer (orange/black, like a Generac or Simpson) set up on a wooden deck, with hose and spray gun attached. Canadian suburban backyard setting. Clean equipment, ready for work. Bright daylight, high quality product photography."
  },
];

console.log("Generating people images...\n");
for (const person of people) {
  console.log(`  Generating: ${person.name}...`);
  try {
    const output = await replicate.run("google/imagen-4-ultra", {
      input: {
        prompt: person.prompt,
        aspect_ratio: "1:1",
      },
    });
    const url = output.url();
    console.log(`    URL: ${url}`);
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(`${outputDir}/people/${person.id}.jpg`, buffer);
    console.log(`    Saved: ${person.id}.jpg`);
  } catch (err) {
    console.error(`    ERROR: ${err.message}`);
  }
}

console.log("\nGenerating asset images...\n");
for (const asset of assets) {
  console.log(`  Generating: ${asset.name}...`);
  try {
    const output = await replicate.run("google/imagen-4-ultra", {
      input: {
        prompt: asset.prompt,
        aspect_ratio: "16:9",
      },
    });
    const url = output.url();
    console.log(`    URL: ${url}`);
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(`${outputDir}/assets/${asset.id}.jpg`, buffer);
    console.log(`    Saved: ${asset.id}.jpg`);
  } catch (err) {
    console.error(`    ERROR: ${err.message}`);
  }
}

// Service hero images — realistic job photos
const services = [
  {
    id: "deck",
    name: "Deck & Fence",
    prompt: "A beautiful freshly built composite deck with railing on the back of a Canadian suburban home, warm cedar-tone boards, clean modern design. A professional worker in branded navy gear is applying stain with a roller. Lush green backyard, sunny summer day in Ontario. Photorealistic, high quality architectural photography, warm natural lighting."
  },
  {
    id: "clean",
    name: "Home Cleaning",
    prompt: "Interior of a bright, spotlessly clean modern Canadian home kitchen and living room. A professional cleaner in a teal branded polo shirt is wiping down a granite countertop with microfiber cloth, cleaning supplies neatly organized nearby. Sunlight streaming through windows, sparkling clean surfaces. Photorealistic, high quality interior photography."
  },
  {
    id: "lawn",
    name: "Lawn Care",
    prompt: "A perfectly manicured front lawn of a Canadian suburban home with fresh mowing stripes. A professional landscaper in a green branded shirt is operating a commercial push mower. Flower beds with mulch, trimmed hedges, clean edges along the sidewalk. Bright summer day in Ontario. Photorealistic, high quality outdoor photography."
  },
  {
    id: "handyman",
    name: "Handyman",
    prompt: "A skilled handyman in a grey branded work shirt is installing a new light fixture in a modern Canadian home. He has a professional tool belt, is working carefully on a ladder. Clean, well-lit room with modern finishes. The work is precise and professional. Photorealistic, high quality interior photography, warm lighting."
  },
  {
    id: "junk",
    name: "Junk Removal",
    prompt: "A professional junk removal team of two workers in red branded t-shirts loading old furniture and boxes into a clean white cube truck. Canadian suburban driveway, the truck is well-branded and organized. One worker carries a couch, the other stacks boxes. Sunny day, clean professional operation. Photorealistic, high quality photography."
  },
];

console.log("\nGenerating service hero images...\n");
for (const svc of services) {
  console.log(`  Generating: ${svc.name}...`);
  try {
    const output = await replicate.run("google/imagen-4-ultra", {
      input: {
        prompt: svc.prompt,
        aspect_ratio: "16:9",
      },
    });
    const url = output.url();
    console.log(`    URL: ${url}`);
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(`${outputDir}/services/${svc.id}.jpg`, buffer);
    console.log(`    Saved: ${svc.id}.jpg`);
  } catch (err) {
    console.error(`    ERROR: ${err.message}`);
  }
}

console.log("\nDone! All images generated.");
