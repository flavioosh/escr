/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');

module.exports = {
	plugins: [autoprefixer, postcssNested],
};
