import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ isMenuOpen, onToggleMenu }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); 
  };


  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={onToggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className={`${styles.title} ${styles.lgHidden}`}>Events Media</h1>
      <div className={styles.profileHeadWrapper}>
        {user && (
          <div className={styles.profileWrapper}>
            <img
              src={`/users/${user.image}`}
              alt={user.name}
              className={styles.userImage}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <div className={styles.userTextWrapper}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
            <ChevronDown
              className={styles.dropdownIcon}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className="lg:hidden">
                  <p className={styles.dropdownName}>{user.name}</p>
                  <p className={styles.dropdownRole}>{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className={styles.dropdownLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
