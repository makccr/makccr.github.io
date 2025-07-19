import Airtable from "airtable";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";

dotenv.config();

export default function (eleventyConfig) {
  const useCache = process.env.NODE_ENV === "production"; // Set to true in production
  const cachePath = path.resolve(".cache/airtable.json");

  eleventyConfig.addGlobalData("airtable", async () => {
    if (useCache && fs.existsSync(cachePath)) {
      console.log("[Airtable] Using cached data.");
      return JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    }

    console.log("[Airtable] Fetching data from Airtable...");

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);

    const records = [];

    return new Promise((resolve, reject) => {
      base("MAKC").select({
        view: "Finished Videos",
      }).eachPage(
        function page(partialRecords, fetchNextPage) {
          partialRecords.forEach((record) => {
            records.push({
              id: record.id,
              ...record.fields,
              heroImage: record.fields.ytid
                ? `https://i.ytimg.com/vi/${record.fields.ytid.trim()}/maxresdefault.jpg`
                : null,
              year: record.fields.Date
                ? new Date(record.fields.Date).getFullYear()
                : null,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            if (!fs.existsSync(".cache")) fs.mkdirSync(".cache");
            fs.writeFileSync(cachePath, JSON.stringify(records, null, 2));
            console.log("[Airtable] Data cached to .cache/airtable.json");
            resolve(records);
          }
        }
      );
    });
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("downloads");

  eleventyConfig.addFilter("postDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("LLLL d, yyyy");
  });
}

