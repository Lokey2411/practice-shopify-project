import type { Config } from "tailwindcss";
import { colors } from './src/commons/colors';
const config: Config = {
  theme: {
    extend: {
      colors: {
        ...colors
      },
      fontFamily:{
        "Inter": ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};

export default config;
