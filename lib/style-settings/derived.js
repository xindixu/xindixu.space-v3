import { get } from "lodash";
import { getSize } from "./utils";

const getDerived = (theme) => ({
  iconButtonSize: `${
    getSize(get(theme, "global.edgeSize.small")) * 2 +
    getSize(get(theme, "icon.size.medium"))
  }px`,
});

export default getDerived;
