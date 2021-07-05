import React from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/logo.svg'

class Header extends React.Component {

    render() {
        return (
            <div className='header-container'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>

                <div className='link-container'>
                    <Link to='/googleMap'>Map</Link>
                    <Link to='/activeVersions'>Active versions</Link>
                    <Link to='/currentUpdates'>Current updates</Link>                    
                </div>
                    
            </div>
        )
    }
}


export default Header
