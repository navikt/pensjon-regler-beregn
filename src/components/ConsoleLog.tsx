import { currentConsolelog } from "../signal/Signals"


interface ConsoleLogProps {
    isFetching: boolean
}
const ConsoleLog: React.FC<ConsoleLogProps> = ( {isFetching}) => {
    const runLog = currentConsolelog.value
    return (
        !!runLog && !isFetching &&
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