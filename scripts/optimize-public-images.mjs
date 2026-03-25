import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

const targets = fs
  .readdirSync(publicDir)
  .filter((file) => file.endsWith('.webp'))
  .sort();

const overrides = {
  '44.webp': { maxWidth: 810, quality: 78 },
};

const getProfile = ({ width = 0, height = 0 }) => {
  const isPortrait = height > width * 1.35;
  const isWide = width > height * 1.35;

  if (isPortrait) {
    return { maxWidth: 420, quality: 58 };
  }

  if (isWide) {
    return { maxWidth: 1600, quality: 60 };
  }

  return { maxWidth: 900, quality: 62 };
};

const formatKB = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

let totalBefore = 0;
let totalAfter = 0;

for (const file of targets) {
  const fullPath = path.join(publicDir, file);
  const inputBuffer = fs.readFileSync(fullPath);
  const metadata = await sharp(inputBuffer).metadata();
  const { maxWidth, quality } = overrides[file] ?? getProfile(metadata);

  const pipeline = sharp(inputBuffer, { failOn: 'none' }).rotate();

  if (metadata.width && metadata.width > maxWidth) {
    pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  const outputBuffer = await pipeline
    .webp({
      quality,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();

  const finalBuffer = outputBuffer.length < inputBuffer.length ? outputBuffer : inputBuffer;

  fs.writeFileSync(fullPath, finalBuffer);

  totalBefore += inputBuffer.length;
  totalAfter += finalBuffer.length;

  const saved = inputBuffer.length - finalBuffer.length;
  console.log(
    `${file}: ${formatKB(inputBuffer.length)} -> ${formatKB(finalBuffer.length)}${saved > 0 ? ` (saved ${formatKB(saved)})` : ' (kept original)'}`
  );
}

console.log(`Total: ${formatKB(totalBefore)} -> ${formatKB(totalAfter)} (saved ${formatKB(totalBefore - totalAfter)})`);
