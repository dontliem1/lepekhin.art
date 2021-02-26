const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Get express projects
  eleventyConfig.addCollection("expressProjects", function(collectionApi) {
    return collectionApi.getFilteredByTag("project").filter(function(item) {
      return "express" in item.data;
    });
  });

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('console', function(value) {
    return util.inspect(value);
});

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc", locale: "ru" }).toLocaleString(DateTime.DATE_FULL);
  });

  // pluralize
  eleventyConfig.addFilter("pluralize", (number, one, few, many) => {
    if (number >= 5 && number <= 20) {
      return number + ' ' + many;
    } else {
      let digit = number % 10;
      if (digit === 1) {
        return number + ' ' + one;
      }
      if (digit >= 2 && digit <= 4) {
        return number + ' ' + few;
      }
    }
    return number + ' ' + many;
  });

  // get current year
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);
  // uncomment when version 1.0.0
  // eleventyConfig.addGlobalData("currentYear", () => `${new Date().getFullYear()}`);

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Add Tailwind Output CSS as Watch Target
  eleventyConfig.addWatchTarget("./_tmp/static/css/style.css");

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./_tmp/static/css/style.css": "./static/css/style.css",
    "./src/admin/config.yml": "./admin/config.yml",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy JS Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/js");

  // Copy Fonts Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/fonts");

  // Copy _headers to /_site
  eleventyConfig.addPassthroughCopy({"./src/static/headers" : "/"});

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
