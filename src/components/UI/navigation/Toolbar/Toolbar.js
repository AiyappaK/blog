import React from 'react';

import './Toolbar.css';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../navgationItems';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className='Toolbar'>
       {/* <DrawerToggle clicked={props.drawerToggleClicked} />*/}
        <div>
            
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;