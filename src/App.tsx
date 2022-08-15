import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Dashboard } from './pages/Dashboard'

import { GlobalStyles } from './styles/global'

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </DndProvider>
    )
}

export default App
