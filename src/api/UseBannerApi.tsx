import { useApi } from "@/hooks/UseApi";
import { IBanner } from "@/types/Banner";
import { useEffect, useState } from "react";
import { bannerRotasApi } from "./rotas/BannerRotasApi";

export function useBannerApi() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const apiBanner = useApi({
    method: "GET",
    url: bannerRotasApi.listaBanner,
    statusInicial: "loading",
  });

  async function listarBanners() {
    const response = await apiBanner.action<IBanner[]>();
    if (Array.isArray(response)) {
      setBanners(response);
    }
  }

  useEffect(() => {
    listarBanners();
  }, []);

  return {
    banners,
    status: apiBanner.status,
  };
}
