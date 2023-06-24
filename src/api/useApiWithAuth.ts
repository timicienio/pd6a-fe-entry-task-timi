import useToken from '@/hooks/useToken';
import apiWithAuth from './authApi';

export default function useApiWithAuth<T>() {
  const token = useToken();
  return apiWithAuth<T>(token);
}
