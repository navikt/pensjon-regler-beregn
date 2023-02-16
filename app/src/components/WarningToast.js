import Toast from 'react-bootstrap/Toast';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastContainer from 'react-bootstrap/ToastContainer';

function WarningToast(props) {
    let footer =  props.footer
    let showWarning = props.showWarning
    let setShowWarning = props.setShowWarning

    return (
        <div  style={{zIndex: 19, position: "absolute",  right: "10px", top:"15px", background:"white", borderRadius:"5px", boxSizing:"border-box", width:"30%", opacity:"0.9"}} >
            <ToastContainer >
                <Toast  onClose={() => setShowWarning(false)} show={showWarning} delay={3000} autohide animation>
                     <Toast.Header closeButton={false} >
                        <strong style={{color:"red",fontsize:"8px", padding:"5px"}} >Informasjon:</strong>
                    </Toast.Header>
                    <Toast.Body style={{color:"black",fontsize:"8px", background:"lightgrey", padding:"6px"}}>{footer}</Toast.Body>
                </Toast>
             </ToastContainer>
         </div>
    )
}

export default WarningToast;