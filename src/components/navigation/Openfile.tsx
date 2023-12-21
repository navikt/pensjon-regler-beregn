import { Button } from "@navikt/ds-react"
import { useNavigate } from "react-router-dom"


const Openfile = () => {

    const navigate = useNavigate();

    const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()

        reader.addEventListener("loadend", () => {
            navigate("/file", { state: { body: reader.result, filename: e.target.files?.item(0)?.name || "", clazzname: parseRequestFromXML(reader.result as string) } })
        }, false)

        if (e.target.files) {
            reader.readAsText(e.target.files[0])
        }

    }

    const clickUpload = () => {
        document.getElementById('file-selector')?.click()
    }

    const parseRequestFromXML = (body: string): any => {
        const xml = new DOMParser().parseFromString(body, "application/xml")
        return xml.documentElement.nodeName
    }

    return (
        <div className="vcenternavbar">
            <input type="file" accept=".xml" hidden={true} id="file-selector" onChange={(e) => previewFile(e)} />
            <Button variant="primary-neutral" onClick={clickUpload}>Åpne</Button>
        </div >
    )
}

export default Openfile;