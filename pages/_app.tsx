import 'tailwindcss/tailwind.css'
import 'react-notifications-component/dist/theme.css'
import '../styles/global.css'
import '/components/Ward/WardTable.component.css'
import { ChakraProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}