import {useEffect} from "react";
import axios from "axios";
import SplitView from "../components/ui-elements/SplitView.tsx"
import Navbar from "../components/navigation/Navbar.tsx"
import {useGlobalState} from "../store/index.ts"
import {mockDebugLog, mockRequestData, mockResponseData, mockSatsTabeller} from "./mockGuiModel.ts"

/**
 * Local-only preview page for visually testing the full "Beregn pensjon" layout,
 * including the Navbar, without a backend connection. Only mounted when running
 * `pnpm dev` (see App.tsx, guarded by import.meta.env.DEV).
 *
 * Requests to /alleSatstabeller are intercepted and answered with mock data so the
 * "Valg sats" dropdown in the Navbar works without hitting a real backend. This is
 * registered at module load time (rather than in a useEffect) because React fires
 * child effects (Navbar -> SatserDropdown, which fetches on mount) before this
 * component's own effect - registering in an effect would be too late to catch it.
 */
let satsInterceptorId: number | null = null;
if (typeof window !== "undefined" && window.location.pathname.startsWith("/dev/preview")) {
    satsInterceptorId = axios.interceptors.request.use((config) => {
        if (config.url?.includes("alleSatstabeller")) {
            config.adapter = async () => ({
                data: mockSatsTabeller,
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }
        return config;
    });
}

const DevPreview: React.FC = () => {
    const state = useGlobalState()

    useEffect(() => {
        state.setDebugLog(mockDebugLog)

        return () => {
            if (satsInterceptorId !== null) {
                axios.interceptors.request.eject(satsInterceptorId);
                satsInterceptorId = null;
            }
        };
    }, []);

    return (
        <>
            <Navbar/>
            <SplitView
                request={mockRequestData}
                response={mockResponseData}
                satstabell="Mock sats"
                isFetching={false}
            />
        </>
    )
}

export default DevPreview
