//React imports
import {React, useState} from 'react'

import {Link} from 'react-router-dom';


//Style import
import './DropDown.css'


//Importing SVG as React components
import {ReactComponent as CaretDown} from '../../assets/caretdown.svg'

function DropDown(props) {

    const dropDownData = props.dropDownData;
    const pageId = props.pageId;
    const title = props.title;

    const [dropDown, setDropDown] = useState(false);

    function handleDropDown(){
        setDropDown(prevDropDown =>!prevDropDown)
    }




    return (
            <div className='dropdown-container'>
                <p href={pageId} className='header__service' onClick={handleDropDown}>
                    {title}
                    <span><CaretDown className='header__service-caretdown'/></span>
                </p>  
                    
                    <div className={dropDown?'dropdown__visible':'dropdown__hidden'}  >
                        {dropDownData.map((listItem,index)=> <li key={index.listItem}>
                                                               <Link to={`/${listItem.link}`}> {listItem.serviceName}</Link>
                                                            </li> )}


                    </div>

            </div>
    )

}

export default DropDown