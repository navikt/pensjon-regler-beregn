import {useGlobalState} from "../../store/index.ts";
import {useEffect, useRef} from "react";


const ConsoleLog: React.FC = () => {

    const state = useGlobalState()
    const ref = useRef<HTMLDivElement>(null)

    const runLog = state.getConsoleLog()
    const visible = !!runLog && runLog?.length > 0

    // #consoleview is a fixed-position footer that overlays .detailcontainer, which also
    // extends to the bottom of the viewport. Without reserving space for it, the last bit of
    // scrollable content in the panes ends up hidden behind this footer. Expose its actual
    // height as a CSS variable so .detailcontainer can add clearance only while it's shown.
    useEffect(() => {
        if (!visible) {
            document.documentElement.style.setProperty("--console-height", "0px");
            return;
        }

        const element = ref.current;
        if (!element) return;

        const updateHeight = () => {
            document.documentElement.style.setProperty("--console-height", `${element.offsetHeight}px`);
        };

        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);
        return () => {
            observer.disconnect();
            document.documentElement.style.setProperty("--console-height", "0px");
        };
    }, [visible]);

    return (
        visible &&
        <div id="consoleview" ref={ref}>
            <div id="consolelog">
                <div className="consolelog">
                    <div id="consolelog_detail">
                        {runLog}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsoleLog