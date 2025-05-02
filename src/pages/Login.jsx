import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const [touched, setTouched] = useState({ email: false, password: false });

    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    const { predefinedUsers } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();

        const matchedUser = predefinedUsers.find(user => user.email === email);

        if (matchedUser) {
            dispatch(loginUser(matchedUser));
            setTimeout(() => navigate('/'), 100);
        } else {
            alert('User not found');
        }
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleLogin} noValidate>
                <div className={styles.logoMainWrapper}>
                    <div className={styles.logoWrapper}>
                        <img src="/logo.png" alt="Logo" className={styles.logo} />
                    </div>

                    <h2 className={styles.title}>Welcome Back</h2>
                    <p className={styles.subtitle}>Please log in to your account</p>
                </div>

                <input
                    type="email"
                    value={email}
                    className={`${styles.input} ${touched.email && !isEmailValid ? styles.invalid : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    required
                    placeholder='Enter your email address here'
                />
                {touched.email && !isEmailValid && (
                    <p className={styles.error}>Enter a valid email.</p>
                )}

                <button type="submit" className={styles.button} disabled={!isEmailValid}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
