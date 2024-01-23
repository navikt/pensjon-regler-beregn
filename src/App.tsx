import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './App.css'
import Navbar from './components/navigation/Navbar'
import {Route, Routes} from 'react-router-dom';
import Wrapper from './components/Wrapper';
import ErrorBoundary from './components/error/ErrorBoundary';
import DetailViewFile from './components/DetailViewFile';
import EnvContextProvider from "./api/context/EnvContext.tsx";



function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <EnvContextProvider>
                <Navbar/>
                <ErrorBoundary>
                    <Routes>
                        <Route path='/:id' element={<Wrapper/>}></Route>
                        <Route path='/file' element={<DetailViewFile/>}></Route>
                    </Routes>
                </ErrorBoundary>
            </EnvContextProvider>
        </QueryClientProvider>
    )
}

export default App
