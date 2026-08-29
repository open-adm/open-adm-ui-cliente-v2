import { useApi } from '@/hooks/UseApi';
import { ICategoria } from '@/types/Categoria';
import { useEffect, useState } from 'react';

export function useListarCategoriasApi() {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const apiList = useApi({
    method: 'GET',
    url: 'ecommerce/categorias/listar',
    statusInicial: 'loading',
  });

  async function listarCategorias() {
    const response = await apiList.action<ICategoria[]>();
    if (response) {
      setCategorias(response);
      return;
    }
  }

  useEffect(() => {
    listarCategorias();
  }, []);

  return {
    status: apiList.status,
    categorias,
  };
}
