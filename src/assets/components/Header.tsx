import React from 'react';

type propTypes = {
    addJson: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const Header:React.FC<propTypes> = (props) => {
    const {addJson} = props
    return (
        <header className="header">
            <h3>Sort app</h3>
            <input id="json" type="file" onChange={addJson} accept=".json"/>
            <label className="header__label" htmlFor="json">
                <svg fill="#fff" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                        fillRule="nonzero"/>
                </svg>
                <span>Load json file</span>
            </label>
        </header>
    );
};

export default Header;