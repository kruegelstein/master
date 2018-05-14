// @flow

export const createPattern = (patternSize, elements) => {
  let pattern = [];
  let i = 0;
  for (i = 0; i < patternSize; i++) {
    const element =
      elements[
        Object.keys(elements)[Math.floor(Math.random() * elements.length)]
      ].key;
    pattern.push(element);
  }
  return pattern;
};
