import React from 'react';
import './Writer.css';
import Save from '../SVGs/save';

const Writer = ({writeFn}) => {
    const [input, setInput] = React.useState({
        ssid: '',
        password: '',
        ip: '',
        gateway: ''
    });
    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const onSave = (e) => {
        e.preventDefault();
        writeFn(JSON.stringify(input));
        setInput('');
    };
    const inputArr = [
        {
            name:'ssid',
            placeholder: 'Enter ssid',
            value: input.ssid
        },
        {
            name:'password',
            placeholder: 'Enter password',
            value: input.password
        },
        {
            name:'ip',
            placeholder: 'Enter IPv4 address',
            value: input.ip
        },
        {
            name:'gateway',
            placeholder: 'Enter gateway',
            value: input.gateway
        }
    ]

    return (
      <div className='write-form'>
        <form onSubmit={onSave}>
            <div className="writer-container">
                {
                    inputArr.map((inp, i) => {
                        return <input key={i} type="text" name={inp.name} placeholder={inp.placeholder} value={inp.value} onChange={onChange}></input>
                    })
                }
                <button className="btn" type="submit">
                    <Save/>
                    Save
                </button>
            </div>
        </form>
      </div>
    );
};

export default Writer;