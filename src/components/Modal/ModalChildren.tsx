import { ReactNode } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { IconApp } from '../Icon/IconApp';
import { TextApp } from '../Text/TextApp';
import { BootstrapDialog, Transition } from './ModalApp';
import { useAppParceiroContext } from '@/context/AppParceiroContext';
import { Button } from '../Button/ButtonApp';

interface propsHeaderModalChildren {
    height?: string;
    padding?: string;
    fontSize?: string;
}

interface propsModalChildren {
    open: boolean;
    children: ReactNode;
    action?: () => void;
    titulo?: string;
    close?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    maxWidth?: 'lg' | 'md' | 'sm' | 'xs' | 'xl';
    textoButton?: string;
    retirarFooter?: boolean;
    padding?: string;
    header?: propsHeaderModalChildren;
    overflowY?: boolean;
    disabledAction?: boolean;
    bloquearFecharModalClickFora?: boolean;
    footerChildren?: ReactNode;
    retirarHeader?: boolean;
}

export function ModalChildren(props: propsModalChildren) {
    const { parceiro } = useAppParceiroContext();
    return (
        <BootstrapDialog
            onClose={(_, reason) => {
                if (
                    props.bloquearFecharModalClickFora &&
                    reason === 'backdropClick'
                ) {
                    return;
                }
                props.close?.();
            }}
            aria-labelledby='customized-dialog-title'
            open={props.open}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            onClick={(e) => e.stopPropagation()}
            slots={{
                transition: Transition
            }}
        >
            {!props.retirarHeader && (
                <DialogTitle
                    sx={{
                        m: 0,
                        p: props.header?.padding ?? '2',
                        height: props.header?.height,
                    }}
                    id='customized-dialog-title'
                >
                    <TextApp
                        titulo={props.titulo ?? parceiro?.nomeFantasia ?? ''}
                        fontSize={props.header?.fontSize ?? '22px'}
                        fontWeight={600}
                    />
                </DialogTitle>
            )}
            {props.close && (
                <IconButton
                    aria-label='close'
                    onClick={props.close}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <IconApp icon='mdi:close' />
                </IconButton>
            )}
            <DialogContent
                dividers
                sx={{
                    padding: props.padding,
                    overflowY: props.overflowY === false ? 'hidden' : undefined,
                    '&.MuiDialogContent-root': {
                        padding: props.padding,
                    },
                }}
            >
                {props.children}
            </DialogContent>
            {!props.retirarFooter && (
                <DialogActions>
                    {props.footerChildren || (
                        <Button
                            variant='contained'
                            onClick={props.action}
                            loading={props.loading}
                            title={props.textoButton}
                            disabled={props.disabledAction}
                        />
                    )}
                </DialogActions>
            )}
        </BootstrapDialog>
    );
}
