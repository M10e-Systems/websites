module.exports = function (eleventyConfig) {
  // Ignore any checked-in build artifacts inside the input dir.
  eleventyConfig.ignores.add("sites/m10e.systems/_site/**");

  // Make static assets (CSS, images, etc.) available in the output root.
  ["m10e.css", "m10e.png"].forEach((asset) => {
    eleventyConfig.addPassthroughCopy({
      [`sites/m10e.systems/${asset}`]: asset,
    });
  });

  // Default layout for Markdown and HTML files.
  eleventyConfig.addGlobalData("layout", "base");

  return {
    dir: {
      input: "sites/m10e.systems",
      output: "_site/m10e.systems",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
