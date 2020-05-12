import xlsxFile from 'read-excel-file/node';

const readFile = async (destination, skip = 0) => {
  const rows = await xlsxFile(destination);
  rows.splice(0, skip);
  return rows;
};

const mapObject = async (object, _map, defaultObj = {}) => {
  return object.map(row => {
    let finalObj = { ...defaultObj };
    _map.forEach((data, index) => (finalObj[data] = row[index]));
    return finalObj;
  });
};

const extract = async (destination, importOptions, defaultObj) => {
  const { skip, schema } = importOptions;
  const rows = await readFile(destination, skip - 1);
  console.table(rows);
  return mapObject(rows, schema, defaultObj);
};

export { readFile, mapObject, extract };
