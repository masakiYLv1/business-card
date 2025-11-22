import { createSystem, defaultConfig } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      backgroundColor: "blue.50",
      color: "gray.800",
    },
  },
});

export default theme;
