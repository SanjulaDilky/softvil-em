import { Outlet } from 'react-router-dom';
import Sidebar from '../components/mainLayout/Sidebar';
import styles from './MainLayout.module.css';
import Header from '../components/mainLayout/Header';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MainLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const { user } = useSelector(state => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className={styles.contentWrapper}>
                <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />

                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
export default MainLayout;