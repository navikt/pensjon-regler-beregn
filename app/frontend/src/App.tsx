import {QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Route, Routes} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import ErrorBoundary from './components/error/ErrorBoundary.tsx';
import ErrorFallback from "./components/error/ErrorFallback.tsx";
import AppHeader from "./components/layout/AppHeader.tsx";
import BeregnPage from "./components/beregn/BeregnPage.tsx";
import Landing from "./components/beregn/Landing.tsx";

const createQueryClient = () => new QueryClient({
    queryCache: new QueryCache({
        onError: (error: unknown) => {
            console.error("QueryCache error triggered:", error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.warn("Unauthorized access - redirecting to login.");
            }
        }
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (axios.isAxiosError(error) && [401, 500, 502].includes(error.response?.status ?? 0)) {
                    return failureCount < 1;
                }
                return failureCount < 3;
            }
        },
    },
})

function App() {
    const [queryClient] = useState(createQueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app-shell">
                <AppHeader/>
                <main className="app-main">
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Routes>
                            <Route path="/" element={<Landing/>}/>
                            <Route path="/:id" element={<BeregnPage/>}/>
                        </Routes>
                    </ErrorBoundary>
                </main>
            </div>
        </QueryClientProvider>
    )
}

export default App
