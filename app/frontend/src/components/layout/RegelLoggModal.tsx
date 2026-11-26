import {BodyShort, Button, CopyButton, HStack, Modal, Search} from "@navikt/ds-react";
import {DownloadIcon} from "@navikt/aksel-icons";
import {useMemo, useState} from "react";

interface RegelLoggModalProps {
    open: boolean;
    onClose: () => void;
    log: string;
}

const download = (text: string) => {
    const url = URL.createObjectURL(new Blob([text], {type: "text/plain"}));
    const link = Object.assign(document.createElement("a"), {href: url, download: "regel-logg.txt"});
    link.click();
    URL.revokeObjectURL(url);
};

const RegelLoggModal: React.FC<RegelLoggModalProps> = ({open, onClose, log}) => {
    const [filter, setFilter] = useState("");
    const lines = useMemo(() => log.split("\n").map((text, index) => ({text, number: index + 1})), [log]);
    const needle = filter.trim().toLowerCase();
    const visible = needle ? lines.filter((line) => line.text.toLowerCase().includes(needle)) : lines;

    const close = () => {
        setFilter("");
        onClose();
    };

    return (
        <Modal open={open} onClose={close} header={{heading: "Regel-logg", size: "small"}} width="1200px">
            <Modal.Body>
                <HStack gap="space-12" align="end" justify="space-between" className="regel-logg-toolbar">
                    <Search label="Filtrer linjer" size="small" variant="simple" value={filter} onChange={setFilter}
                            onClear={() => setFilter("")} htmlSize={30}/>
                    <BodyShort size="small" textColor="subtle">
                        {needle ? `${visible.length} av ${lines.length} linjer` : `${lines.length} linjer`}
                    </BodyShort>
                </HStack>
                <pre className="regel-logg" tabIndex={0} aria-label="Regel-logg">
                    {visible.map((line) => (
                        <div key={line.number} className="regel-logg-line" data-level={/FEIL|ERROR|Exception/i.test(line.text) ? "error" : undefined}>
                            <span className="regel-logg-number" aria-hidden>{line.number}</span>
                            <span>{line.text || " "}</span>
                        </div>
                    ))}
                </pre>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="secondary" onClick={close}>Lukk</Button>
                <Button type="button" variant="tertiary" icon={<DownloadIcon aria-hidden/>} onClick={() => download(log)}>
                    Last ned
                </Button>
                <CopyButton copyText={log} text="Kopier" activeText="Kopiert" variant="action"/>
            </Modal.Footer>
        </Modal>
    );
};

export default RegelLoggModal;
