import fs from 'fs'
import path from 'path'

const csvPath = path.join(__dirname, 'data.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');

const lines = csvData.trim().split('\n');
const [header, ...rows] = lines;

const result = rows.map((line: string) => {
    const [id, name, consumable] = line.split(',');

    return {
        id: Number(id),
        name: name,
        consumable: consumable.trim().toLowerCase() === 'true',
    };
});

const fileContent = `
export const listingCategory = ${JSON.stringify(result)}
`.trim()

const outputPath = path.join("./lib/database", 'listingCategory.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`✅ listingCategory.ts generated at ${outputPath}`);