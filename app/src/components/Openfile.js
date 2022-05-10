import React from "react";
import {Button} from "@navikt/ds-react";


export function Openfile(props) {


    function openFile() {
        const fileSelector = document.getElementById('file-selector');
        fileSelector.addEventListener('change', (event) => {
            const fileList = event.target.files;
            console.log(fileList);
        });
    }

    function readImage(file) {
        // Check if the file is an image.
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            img.src = event.target.result;
        });
        reader.readAsText(file, 'UTF-8');
    }



    function previewFile(e) {
        // const content = document.querySelector('.content');
        const fileSelector = document.getElementById('file-selector');
        const reader = new FileReader();

        reader.addEventListener("loadend", () => {
            // this will then display a text file
            console.log(reader.result)
            //TODO  send  xml request to server check javafx code
        }, false);

        if (e.target.files[0]!=null) {
            reader.readAsDataURL(e.target.files[0]);
        }

    }

    function clickOpen(e) {
        document.getElementById('file-selector').click();
    }

    return (

            <div>
                {/*<input type="button" id="get_file" value="Åpne" onClick={(e => clickOpen(e))}  style={{background:"transparent",color:"white"}}/>*/}
                <input type="file" id="file-selector" accept=".xml" onChange={(e) => previewFile(e)} hidden={true}/>
                <Button id="get_file" onClick={(e => clickOpen(e))}  style={{background:"transparent",color:"white"}} >Åpne</Button>
            </div>

    )
}