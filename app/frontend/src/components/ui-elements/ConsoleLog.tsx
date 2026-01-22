import {useGlobalState} from "../../store";


const ConsoleLog: React.FC = () => {

    const state = useGlobalState()

    const runLog = state.getConsoleLog()
    return (
        !!runLog && runLog?.length > 0 &&
        <div id="consoleview">
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