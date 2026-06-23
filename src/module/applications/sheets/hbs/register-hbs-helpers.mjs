import { add, div, invert, mul, sub } from "./math.mjs";

const helpers = { invert, add, sub, mul, div };

export default function registerHbsHelpers() {
  for (const [name, fn] of Object.entries(helpers)) {
    Handlebars.registerHelper(name, fn);
  }
}
