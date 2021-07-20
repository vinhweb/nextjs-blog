import 'tailwindcss/tailwind.css'
import 'react-notifications-component/dist/theme.css'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}