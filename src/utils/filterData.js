import isEqual from 'lodash/isEqual';
import reduce from 'lodash/reduce';

export const filterData = (initialData, data) => {
  const filteredData = {};
  if (!isEqual(initialData, data)) {
    reduce(data, (result, value, key) => isEqual(value, initialData[key]) ? filteredData : filteredData[key] = data[key], []);
  }
  return filteredData;
};
