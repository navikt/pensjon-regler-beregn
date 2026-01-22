import {QueryCache, QueryClient, QueryClientProvider, QueryErrorResetBoundary} from '@tanstack/react-query';
import './App.css'
import Navbar from './components/navigation/Navbar.tsx'
import {Route, Routes} from 'react-router-dom';
import Wrapper from './components/ui-elements/Wrapper.tsx';
import ErrorBoundary from './components/error/ErrorBoundary.tsx';
import ErrorFallback from "./components/error/ErrorFallback.tsx";
import axios from "axios";

function App() {

    const queryClient = new QueryClient(
        {
            queryCache: new QueryCache({
                onError: (error: unknown) => {
                    console.error("QueryCache error triggered:", error);
                    if (axios.isAxiosError(error) && (error.response?.status === 401)) {
                        console.warn("Unauthorized access - redirecting to login.");
                    }
                }
            }),
            defaultOptions:
                {
                    queries:
                        {
                            refetchOnWindowFocus: false,
                            throwOnError: true,
                            retry: (failureCount, error) => {
                                let shouldRetry = true;
                                console.error("Query retry triggered. Failure count:", failureCount, "Error:", error);
                                if (axios.isAxiosError(error)
                                    && (error.response?.status === 401 ||
                                        error.response?.status === 502 ||
                                        error.response?.status === 500
                                    )) {
                                    shouldRetry = failureCount < 1;
                                }
                                return shouldRetry;
                            }
                        },
                },
        })

    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Navbar/>
                    <Routes>
                        <Route path='/:id' element={<Wrapper/>}></Route>
                    </Routes>
                </ErrorBoundary>
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    )
}

export default App
