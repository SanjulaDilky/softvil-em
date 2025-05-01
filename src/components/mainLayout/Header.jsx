import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';

const Header = ({ isMenuOpen, onToggleMenu }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <h1 className={[styles.title, 'lg:hidden']}>Events Media</h1>
      <div className={styles.userInfo}>
        {user ? (
          <>
            <img src={`/users/${user.image}`} alt={user.name} className={styles.userImage} />
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>{user.role}</span>
            <button onClick={() => dispatch(logoutUser())} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <span style={{ color: '#ccc' }}>Not logged in</span>
        )}
      </div>
      <button className={styles.menuButton} onClick={onToggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Header;
