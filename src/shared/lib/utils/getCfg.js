/**
 *
 */
export const getCfg = (node, selector) => {
  return JSON.parse(node.getAttribute(selector));
};
