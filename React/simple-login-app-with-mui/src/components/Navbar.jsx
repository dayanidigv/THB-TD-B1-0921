import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import useIsLoggedIn from '../customhook/isLogin';
    
export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, user] = useIsLoggedIn();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color='red'>My App</Typography>
                {isLoggedIn && (
                    <>
                    <Typography variant="body1" style={{marginLeft: '10px'}}>{`Welcome, ${user}`}</Typography>
                    <Button color="inherit" style={{marginLeft: 'auto'}} onClick={() => {
                        navigate('/logout', {replace: true});
                    }}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
