module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("**/_site/**");

  eleventyConfig.addPassthroughCopy({
    "sites/kevinbarrett.dev/kb.css": "kb.css",
  });

  eleventyConfig.addGlobalData("layout", "base");

  return {
    dir: {
      input: "sites/kevinbarrett.dev",
      output: "_site/kevinbarrett.dev",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
