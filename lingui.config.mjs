/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "ms"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/src/i18n/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
