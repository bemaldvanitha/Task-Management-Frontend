import { CiBellOn } from "react-icons/ci";
import { Link } from 'react-router-dom';

import './CustomNavbar.css';

const CustomNavbar = () => {
    return (
        <div className={'navBar'}>
            <div className={'navBarHeaderContainer'}>
                <Link href="/">
                    <p className={'navBarHeader'}>Task Management</p>
                </Link>
            </div>
            <div className={'navBarActionContainer'}>
                <div>
                    <CiBellOn color={'#f0f0f0'} size={40}/>
                </div>
                <Link href="/">
                    <p className={'navBarAction'}>Admin</p>
                </Link>
            </div>
        </div>
    );
};

export default CustomNavbar;