import useApiWithAuth from '@/api/useApiWithAuth';
import useSWR from 'swr';
import useUserId from './useUserId';
import UserType from '@/api/user/UserType';

export default function useUser() {
  const userId = useUserId();
  const fetcher = useApiWithAuth<{ status: string; message: string; user: UserType }>();

  const { data, error, isLoading } = useSWR(`/users/${userId}`, fetcher);

  return {
    user: data?.user,
    error,
    isLoading
  };
}
