import { FC, useState } from 'react'
import { Routing } from '~/pages'
import './styles/index.css'
import { Navigation } from '~/widgets/ui'

const App: FC = () => {
	const [isAuth] = useState<boolean>(true)

	return (
		<>
			<Routing />
		</>
	)
}

export default App
