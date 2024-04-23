export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // Si el número total de páginas es 7 o menos,
  // devolver todas las páginas
  if (totalPages <= 7) {
    return [...Array(totalPages)].map((_, index) => index + 1);
  }

  // Si la página actual está entre las primeras 3 páginas
  // devolver las primeras 3, puntos suspensivos y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // Si la página actual está entre las últimas 3 páginas
  // devolver las primeras 2, puntos suspensivos y las últimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual está en otro lugar medio
  // devolver la primera página, puntos suspensivos, la página actual y vecinos
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
