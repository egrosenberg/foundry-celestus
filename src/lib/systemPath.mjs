import C_CONST from "../module/const.mjs";

/**
 * Converts path relative to system to path relative to foundry data
 * @param {string} path
 * @returns {string} new absolute path to file
 */
export default function systemPath(path) {
  return `systems/${C_CONST.systemID}/${path}`;
}
