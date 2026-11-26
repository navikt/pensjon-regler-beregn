import {TabElement} from "@pensjon/domain";
import {JsonParser} from "./JsonParser.tsx";

interface TabProps {
    tab: TabElement;
}

export const TabComponent = ({tab}: TabProps) => <JsonParser data={tab.data}/>;
