import Logo from '../../image/icons/logo.svg'
import User from '../../image/icons/user-icon.svg'
import './style.scss'

const Header = () => {
    return (
        <div className='header'>

            <div className='container-icons-header'>
                <div className='logo'><img src={Logo} alt="" /></div>
                <div className='user'><img src={User} alt="" /></div>
            </div>

        </div>
    )
}

export default Header;