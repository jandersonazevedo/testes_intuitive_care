const nameToVar = (name) => {
  return name
    .toLowerCase()
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

module.exports = nameToVar;