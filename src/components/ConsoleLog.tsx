import { currentConsolelog } from "../signal/Signals"


const ConsoleLog: React.FC = () => {
    const runLog = currentConsolelog.value

    return (
        !!runLog &&
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