export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api/?seed=midudev&results=10&page=${pageParam}`
  )
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener usuarios'); // Forma correcta de manejar errores en fetch
      return res.json();
    })
    .then((res) => {
      const currentPage = Number(res.info.page);
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1;
      return { nextCursor, users: res.results };
    });
};
