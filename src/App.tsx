import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './App.css'
import Navbar from './components/navigation/Navbar'
import {Route, Routes} from 'react-router-dom';
import Wrapper from './components/Wrapper';
import ErrorBoundary from './components/error/ErrorBoundary';
import DetailViewFile from './components/DetailViewFile';
import ErrorFallback from "./components/error/ErrorFallback.tsx";


function App() {

    const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false,},},})

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Navbar/>
                <Routes>
                    <Route path='/:id' element={<Wrapper/>}></Route>
                    <Route path='/file/*' element={<DetailViewFile/>}></Route>
                </Routes>
            </ErrorBoundary>
        </QueryClientProvider>
    )
}

export default App
