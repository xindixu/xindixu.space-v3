import { defaultProps } from "grommet";
import spacer from "./spacer";

import getDerived from "./derived";

const { theme } = defaultProps;

const derived = getDerived(theme);

const styleSettings = {
  ...theme.global,
  ...spacer,
  ...derived,
};

export default styleSettings;
