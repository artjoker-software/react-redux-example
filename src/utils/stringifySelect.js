const stringifySelect = (array) => {
  if (array.constructor !== Array) {
    throw new Error(`Expected Array as an input, got ${typeof array}`);
  }

  let first = null;
  let current = false;
  let previous = false;
  let moreThanTwo = false;
  let result = '';

  for (let idx = 0; idx < array.length; idx += 1) {
    current = (array[idx + 1] - array[idx] === 1);

    if (!current && !previous) {
      result += `${array[idx]}, `;
    } else if (current && !previous) {
      first = array[idx];
    } else if (current && previous) {
      moreThanTwo = true;
    } else if (!current && previous) {
      if (moreThanTwo) {
        result += `${first}-${array[idx]}, `;
        first = null;
        moreThanTwo = false;
      } else {
        result += `${first}, ${array[idx]}, `;
      }
    }

    previous = current;
  }

  return result.slice(0, result.length - 2).replace(/\s/g, '');
};

export default stringifySelect;
