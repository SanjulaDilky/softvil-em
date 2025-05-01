import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Calendar1Icon, HomeIcon, User2Icon } from 'lucide-react';


const Sidebar = ({ isOpen, onClose }) => {

    const location = useLocation();

    const navLinks = [
        { label: 'Dashboard', to: '/', icon: <HomeIcon size={18} /> },
        { label: 'Manage Events', to: '/events/manage', icon: <Calendar1Icon size={18} /> },
        { label: 'User Profile', to: '/profile/123', icon: <User2Icon size={18} /> },
    ];

    const renderLinks = () => (
        <nav className={styles.nav}>
            {navLinks.map(({ label, to ,icon}) => (
                <Link
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={`${styles.navLink} ${location.pathname === to ? styles.active : ''}`}
                >
                    {icon && <>{icon}</>} 
                
                    {label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className={styles.desktopSidebar}>
                <div className={styles.logoContainer}>
                    <img src="/logo.png" alt="event-manager-logo" className={styles.logo} />
                    <h2 className={styles.title}>Events Media</h2>
                </div>
                <hr className={styles.separator} color='#434646'/>

                {renderLinks()}
            </aside>

            {isOpen && (
                <div className={styles.mobileOverlay} onClick={onClose}>
                    <div
                        className={styles.mobileSidebar}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.logoContainer}>
                            <img src="/logo.png" alt="event-manager-logo" className={styles.logo} />
                            <h2 className={styles.title}>Events Media</h2>
                        </div>
                        <hr className={styles.separator} color='#434646'/>
                        {renderLinks()}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
