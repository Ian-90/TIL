
module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
      }
    }
  }
};
