module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["@babel/plugin-proposal-optional-chaining"],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@nav": "./src/nav",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@theme": "./src/theme",
          "@utils": "./src/utils",
          "@i18n": "./src/i18n",
          "@hooks": "./src/hooks",
          "@HOC": "./src/HOC",
          "@providers": "./src/providers",
        },
      },
    ],
  ],
};
