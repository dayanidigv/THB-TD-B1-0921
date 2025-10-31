import {Box, Paper, Typography} from "@mui/material";
import {useState, useEffect, use} from 'react';
import useIsLoggedIn from "../customhook/isLogin";
import {useNavigate} from "react-router-dom";

export default function Dashboard(props) {
    const [isLoggedIn, user] = useIsLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/');
        }
    }, []);

    return (
        <Box>
            <Paper elevation={3} style={{padding: '20px', maxWidth: '600px', margin: '50px auto'}}>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
                <Typography variant="body1">
                   Hello <b>{user}</b>!, <br />Welcome to the Dashboard! Here you can find an overview of your application.
                </Typography>
            </Paper>
        </Box>
    );
}
