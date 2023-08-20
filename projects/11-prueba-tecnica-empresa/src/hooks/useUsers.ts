import { type User } from '../types.d';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/users';
export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>(
    ['users'],
    fetchUsers,
    {
      getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
    }
  )

  return {
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  }
}
