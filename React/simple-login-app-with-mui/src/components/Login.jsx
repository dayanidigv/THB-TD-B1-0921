
import {Box, Paper, TextField, Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import useIsLoggedIn from "../customhook/isLogin";

export default function Login() {
    const [email, setEmail] = useState(''); 
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoggedIn, user] = useIsLoggedIn();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        if (location.pathname === '/logout') {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        if(isLoggedIn) {
            navigate('/dashboard', {replace: true});
        }
    }, []);

    const setCookie = (name, value, maxAge) => {
        // Interpret maxAge as minutes. If maxAge is provided (number), convert to seconds
        // and set the cookie's max-age accordingly. If not provided, leave it as a session cookie.
        let maxAgeAttr = "";
        if (typeof maxAge === 'number' && !isNaN(maxAge)) {
            const seconds = Math.max(0, Math.floor(maxAge * 60));
            maxAgeAttr = "; max-age=" + seconds;
        }
        // encode the value to be safe
        document.cookie = name + "=" + encodeURIComponent(value || "") + maxAgeAttr + "; path=/";
        navigate('/dashboard', {replace: true});
    }


    const handleLogin = () => {

        if(!email) {
            alert("Please enter your email.");
        }

        // TODO: validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        console.log(email, rememberMe);

        if(rememberMe) {
            localStorage.setItem('user', email);
        } else {
            sessionStorage.setItem('user', email);
        }

        setCookie('user', email, rememberMe ? 1 : null);
    }


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <>
        <Box>
            <Paper elevation={3} style={{padding: '20px', maxWidth: '400px', margin: '50px auto'}}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form noValidate autoComplete="off">
                    <TextField 
                        label="Email" 
                        type="email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <FormControlLabel
                        control={<Checkbox name="rememberMe" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Remember Me"
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        style={{marginTop: '20px'}}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
        </>
    );
}