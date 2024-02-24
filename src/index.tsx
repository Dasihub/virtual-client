import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from '~/app'

const root = createRoot(document.getElementById('root') as HTMLDivElement)

const query = new QueryClient()

root.render(
	<QueryClientProvider client={query}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</QueryClientProvider>
)
