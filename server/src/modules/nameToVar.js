const nameToVar = (name) => {
  // Esta função converte uma palavra para um nome de variável em minúsculo, sem acento e serparados por undeline;
  //Exemplo: São João -> sao_joao
  return name
    .toLowerCase()
    .replace(/\s/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

module.exports = nameToVar;
