import { ModalChildren } from './ModalChildren';
import { BoxApp } from '../Box/BoxApp';
import { formatMoney } from '@/utils/FormatMoney';
import { TextApp } from '../Text/TextApp';
import { useThemeApp } from '@/hooks/UseThemeApp';
import { DividerApp } from '../Divider/DividerApp';
import { listaDeIcones } from '@/config/ListaDeIcones';
import { ButtonCopy } from '../Button/ButtonCopy';

interface propsModalPix {
  open: boolean;
  setOpen: (open: boolean) => void;
  qrCodeBase64: string;
  copiaECola: string;
  linkPagamento: string;
  valor: number;
}

export function ModalPix(props: propsModalPix) {
  const { cores, borderRadius, shadow } = useThemeApp();
  const { open, setOpen, copiaECola, qrCodeBase64, valor } = props;
  return (
    <ModalChildren open={open} maxWidth="lg" retirarFooter close={() => setOpen(false)}>
      <BoxApp
        display="flex"
        gap="1rem"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minWidth="450px"
      >
        <img
          src={`data:image/png;base64,${qrCodeBase64}`}
          alt="PIX"
          style={{
            maxWidth: '200px',
            borderRadius: borderRadius,
            boxShadow: shadow,
          }}
        />
        <BoxApp display="flex" gap="1rem" alignItems="center" flexDirection="column">
          <TextApp
            titulo={`Valor: ${formatMoney(valor ?? 0)}`}
            color={cores.success}
            fontWeight={600}
            fontSize="1.2rem"
          />
          <TextApp titulo={`Banco: Mercado pago`} />
        </BoxApp>
        <DividerApp width="100%" />
        <BoxApp
          display="flex"
          gap="1rem"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <ButtonCopy
            textoParaCopiar={copiaECola ?? ''}
            label="Copia e cola PIX"
            icone={listaDeIcones.pix}
            fullWidth
          />
        </BoxApp>
      </BoxApp>
    </ModalChildren>
  );
}
