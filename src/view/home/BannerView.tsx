import { IBanner } from '@/types/Banner';
import styles from './BannerView.module.css';
import { ImageApp } from '@/components/Image/ImageApp';
import { StatusRequisicao } from '@/types/StatusRequisicao';
import { LoadingApp } from '@/components/Loading/LoadingApp';

interface propsBannerView {
  banners: IBanner[];
  status?: StatusRequisicao;
}

export function BannerView(props: propsBannerView) {
  if (props.status === 'loading') {
    return <LoadingApp height="150px" width="100%" texto="Carregando banners..." />;
  }

  if (!Array.isArray(props.banners) || props.banners.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.carrossel}>
      <div className={styles.track}>
        {props.banners.map((banner, index) => (
          <ImageApp
            width={300}
            height={200}
            key={index}
            src={banner.foto}
            alt={index.toString()}
            className={styles.image}
          />
        ))}
        {props.banners.map((banner, index) => (
          <ImageApp
            width={300}
            height={200}
            key={index}
            src={banner.foto}
            alt={index.toString()}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  );
}
