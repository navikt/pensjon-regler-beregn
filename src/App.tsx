import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './App.css'
import Navbar from './components/navigation/Navbar'
import {Route, Routes} from 'react-router-dom';
import Wrapper from './components/ui-elements/Wrapper.tsx';
import ErrorBoundary from './components/error/ErrorBoundary';
import ErrorFallback from "./components/error/ErrorFallback.tsx";

function App() {

    const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false,},},})

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Navbar/>
                <Routes>
                    <Route path='/:id' element={<Wrapper/>}></Route>
                </Routes>
            </ErrorBoundary>
        </QueryClientProvider>
    )
}

export default App
