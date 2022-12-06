import React, { useCallback, useContext, useEffect, useState } from 'react';
import Scanner from '../components/Scanner/Scanner';
import { ActionsContext } from '../contexts/context';

const Scan = () => {
    const [message, setMessage] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const { actions, setActions} = useContext(ActionsContext);

    const scan = useCallback(async() => {

        if ('NDEFReader' in window) { 
            try {
                
                const ndef = new window.NDEFReader();
                await ndef
                .scan()
                .then((data) => {
                    window.alert(data)
                    window.alert(JSON.stringify(data))

                    console.log("Scan started successfully.");
                    ndef.onreadingerror = (event) => {
                    console.log(
                        "Error! Cannot read data from the NFC tag. Try a different one?"
                    );
                    };
                    ndef.onreading = (event) => {
                        console.log("NDEF message read."); 
                        window.alert(JSON.stringify(event.serialNumber))
                        window.alert(JSON.stringify(event.data))  
                        onReading(event);
                        setActions({
                            scan: 'scanned',
                            write: null
                        });
                    };
                })
                .catch((error) => {
                    console.log(`Error! Scan failed to start: ${error}.`);
                }); 

            } catch(error){
                console.log(`Error! Scan failed to start: ${error}.`);
            };
        }
    },[setActions]);

    const onReading = (event) => { 
        const {message, serialNumber} = event 
        setSerialNumber(serialNumber);
        for (const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    setMessage(textDecoder.decode(record.data));
                    break;
                case "url":
                    // TODO: Read URL record with record data.
                    break;
                default:
                    // TODO: Handle other records with record data.
                }
        }
    };

    useEffect(() => {
        scan();
    }, [scan]);

    return(
        <>
            {actions.scan === 'scanned' ?  
            <div>
                <p>Serial Number: {serialNumber}</p>
                <p>Message: {message}</p>
            </div>
            : <Scanner status={actions.scan}></Scanner> }
        </>
    );
};

export default Scan;