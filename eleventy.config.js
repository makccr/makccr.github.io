import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addFilter("postDate", dateObj => {
	eleventyConfig.addPassthroughCopy("downloads");
  return DateTime.fromJSDate(dateObj).toFormat("LLLL d, yyyy")
})

};


