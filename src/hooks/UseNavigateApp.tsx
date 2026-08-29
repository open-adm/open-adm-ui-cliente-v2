import { useNavigate, useParams } from 'react-router-dom'

export function useNavigateApp() {
  const navigateRouter = useNavigate()
  const params = useParams()

  function navigate(url?: string) {
    if (url) {
      navigateRouter(url, { replace: true })
    }
  }

  return {
    navigate,
    params,
  }
}
