import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Theme } from "@radix-ui/themes";


createRoot(document.getElementById('root')).render(
    <Theme>
      <App />
    </Theme>
)
