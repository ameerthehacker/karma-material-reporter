const baseImagePath = '/src/assets/images';
const chromeLogo = `${baseImagePath}/chrome-logo.png`;
const fireFoxLogo = `${baseImagePath}/firefox-logo.png`;
const safariLogo = `${baseImagePath}/safari-logo.png`;
const phantomJSLogo = `${baseImagePath}/phantomjs-logo.png`;
const operaLogo = `${baseImagePath}/opera-logo.png`;
const ieLogo = `${baseImagePath}/ie-logo.png`;

export const browserImages = [
  { name: 'HeadlessChrome', image: chromeLogo },
  { name: 'Chrome', image: chromeLogo },
  { name: 'Firefox', image: fireFoxLogo },
  { name: 'Safari', image: safariLogo },
  { name: 'PhantomJS', image: phantomJSLogo },
  { name: 'Opera', image: operaLogo },
  { name: 'IE', image: ieLogo }
];
