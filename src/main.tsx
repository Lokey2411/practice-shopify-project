import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './App.tsx'
import ProductContext from './context/ProductContext.tsx'

createRoot(document.getElementById('root')!).render(
	<ProductContext>
		<App />
	</ProductContext>,
)
