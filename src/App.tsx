import { useBannerApi } from '@/api/UseBannerApi'
import { BoxApp } from '@/components/Box/BoxApp'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { IconApp } from '@/components/Icon/IconApp'
import { useSnackbar } from '@/components/SnackBar/UseSnackBar'
import { TextApp } from '@/components/Text/TextApp'
import { AppAuthProvider } from '@/context/AppAuthContext'
import { AppCarrinhoProvider } from '@/context/AppCarrinhoContext'
import { AppParceiroProvider } from '@/context/AppParceiroContext'
import { AppThemeProvider } from '@/context/AppThemeContext'
import { useApi } from '@/hooks/UseApi'
import { useThemeApp } from '@/hooks/UseThemeApp'
import type { ICategoria } from '@/types/Categoria'
import { ViewCarrinho } from '@/view/carrinho/ViewCarrinho'
import { TodasCategorias } from '@/view/categoria/TodasCategorias'
import { ViewEsqueceuSenha } from '@/view/esqueceuSenha/ViewEsqueceuSenha'
import { BannerView } from '@/view/home/BannerView'
import { CategoriaView } from '@/view/home/CategoriaView'
import { ViewLogin } from '@/view/login/ViewLogin'
import { ViewLojaParceira } from '@/view/lojaParceira/ViewLojaParceira'
import { ViewItensPedido } from '@/view/pedido/ViewItensPedido'
import { ViewPedido } from '@/view/pedido/ViewPedido'
import { ViewProduto } from '@/view/produto/ViewProduto'
import { RecuperarSenhaView } from '@/view/recuperar-senha'
import { FormUsuario } from '@/view/usuario/Form/FormUsuario'
import { EditarViewMinhaConta } from '@/view/usuario/MinhaConta/EditarViewMinhaConta'
import { ViewMinhaConta } from '@/view/usuario/MinhaConta/ViewMinhaConta'
import { ViewTrocarSenha } from '@/view/usuario/TrocarSenha/ViewTrocarSenha'
import { Paper, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

function HomePage() {
  const apiBanner = useBannerApi()
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const apiListCategorias = useApi({
    method: 'GET',
    url: 'ecommerce/categorias/home',
    statusInicial: 'loading',
  })
  const { backgroundColor } = useThemeApp()

  useEffect(() => {
    void apiListCategorias.action<ICategoria[]>().then((response) => {
      setCategorias(response ?? [])
    })
  }, [])

  return (
    <BoxApp
      height="100%"
      width="100%"
      maxWidth="750px"
      margin="0 auto"
      backgroundColor={backgroundColor.default}
    >
      <BannerView banners={apiBanner.banners} status={apiBanner.status} />
      <CategoriaView categorias={categorias} />
    </BoxApp>
  )
}

function CadastroRealizadoPage() {
  const { cores } = useThemeApp()

  return (
    <BoxApp display="flex" alignItems="center" justifyContent="center" padding="20px">
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, maxWidth: 600, width: '100%' }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <IconApp icon="mdi:check-circle" width="64px" style={{ color: cores.success }} />
          <TextApp titulo="Cadastro recebido! 🎉" fontSize="32px" fontWeight={700} color={cores.success} />
          <TextApp titulo="Agora precisamos validar suas informações. Você receberá um e-mail assim que sua conta estiver liberada para compras." fontSize="16px" color={cores.text.secondary} textAlign="center" />
        </Stack>
      </Paper>
    </BoxApp>
  )
}

function StoreRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro-realizado" element={<CadastroRealizadoPage />} />
      <Route path="/carrinho" element={<ViewCarrinho />} />
      <Route path="/categoria" element={<TodasCategorias />} />
      <Route path="/esqueceu-senha" element={<ViewEsqueceuSenha />} />
      <Route path="/login" element={<ViewLogin />} />
      <Route path="/loja-parceira" element={<ViewLojaParceira />} />
      <Route path="/minha-conta" element={<ViewMinhaConta />} />
      <Route path="/minha-conta/editar" element={<EditarViewMinhaConta />} />
      <Route path="/pedido" element={<ViewPedido />} />
      <Route path="/pedido/:id" element={<ViewItensPedido />} />
      <Route path="/produto" element={<ViewProduto />} />
      <Route path="/produto/:slug" element={<ViewProduto />} />
      <Route path="/recuperar-senha/:id" element={<RecuperarSenhaView />} />
      <Route path="/trocar-senha" element={<ViewTrocarSenha />} />
      <Route path="/usuario/criar" element={<FormUsuario />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const Snack = useSnackbar()

  return (
    <AppParceiroProvider>
      <AppThemeProvider>
        <AppAuthProvider>
          <AppCarrinhoProvider>
            <Snack.Componet />
            <div className="container-div">
              <Header />
              <main className="container-main"><StoreRoutes /></main>
              <Footer />
            </div>
          </AppCarrinhoProvider>
        </AppAuthProvider>
      </AppThemeProvider>
    </AppParceiroProvider>
  )
}
