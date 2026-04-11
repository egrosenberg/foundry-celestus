// Source - https://stackoverflow.com/a/43849204
// Posted by Adriano Spadoni, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-11, License - CC BY-SA 4.0

/**
 * Resolves the value of a nested value of an object by a string
 * @param {object} object
 * @param {string} path
 * @param {any} defaultValue
 * @returns {unknown}
 */
export default function resolvePath(object, path, defaultValue) {
  return path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);
}
