import React from 'react'
import './AddKey.scss'
import { useState, useEffect } from 'react'

function AddKey(props) {

    const [active, setActive] = useState(!props.addKeyToggle)
    const [key, setKey] = useState('');

    useEffect(() => {
        setActive(props.addKeyToggle);
    }, [active, props.addKeyToggle])


    const addKeyClose = () => {
        props.closeMe();
        reset();
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('new key');
        props.addPublicKey({ active, key });
        addKeyClose();
    }
    const reset = () => {
        setKey('');
    }

    return (
        <div className={active ? 'add-key-modal-wrapper' : 'add-key-modal-wrapper-hide'}>
            <div className="add-key-modal">
                <button onClick={addKeyClose} className="add-key-close-btn" type="button">X</button>
                <form className="form" onSubmit={handleSubmit}>
                    <label>enter the key
                        <input
                            className="input"
                            type="text"
                            onChange={event => setKey(event.currentTarget.value)}
                            value={key}>
                        </input>
                    </label>
                    <button className="add-key-button" type="submit">Add key</button>
                </form>
            </div>
        </div>
    )

}
export { AddKey }

