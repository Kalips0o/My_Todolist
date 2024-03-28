import React, { useEffect } from 'react';
import './App.css';
import { useActions, useAppSelector } from '../common/hooks/hooks';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';
import { Brightness4, BrightnessHigh } from '@mui/icons-material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { authActions } from '../features/Login';
import { selectColorTheme, selectIsInitialized, selectStatus } from '../features/Application/applicationSelectors';
import { selectIsLoggedIn } from '../features/Login/authSelectors';
import { appActions } from '../features/CommonActions/AppActions';
import { appAsyncActions } from '../features/Application';
import { ErrorSnackbars } from '../common/components/ErrorSnackbar/ErrorSnackbar';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { Login } from '../features/Login/Login';

type AppPropsType = {
    demo?: boolean
}

function App({ demo = false }: AppPropsType) {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isInitialized = useAppSelector(selectIsInitialized)
    const status = useAppSelector(selectStatus)
    const colorTheme = useAppSelector(selectColorTheme)
    const location = useLocation()

    const { logout } = useActions(authActions)
    const { changeAppTheme } = useActions(appActions)
    const { initializeApp } = useActions(appAsyncActions)

    useEffect(() => {
        if (!demo && !isInitialized) {
            initializeApp()
        }
    }, [initializeApp, demo, isInitialized])

    //color theme logic
    const theme = createTheme({
        palette: {
            mode: colorTheme,
            primary: {
                main: 'rgba(159,161,161,0.49)',
            },
            secondary: {
                main: '#78189d',
            },
        }
    })
    const toggleColorTheme = () => changeAppTheme({ colorTheme })


    if (!isInitialized) {
        return (
            <div className="loading-container">
                <CircularProgress size={50} />
            </div>
        )
    }
    const logoutHandler = () => {
        logout()
    }

    return (
        <div>
            <ErrorSnackbars />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {location.pathname !== '/login' && (
                    <AppBar position="static">
                        <Toolbar className="appbar-toolbar">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <IconButton onClick={toggleColorTheme}>
                                    {colorTheme === 'dark' ? <BrightnessHigh /> : <Brightness4 />}
                                </IconButton>
                            </IconButton>
                            <Typography variant="h6">
                                Todolists
                            </Typography>
                            <div>
                                {isLoggedIn && (
                                    <Button color="inherit" variant={'outlined'} onClick={logoutHandler}>Log out</Button>
                                )}
                            </div>
                        </Toolbar>
                        {status === 'loading' && (
                            <LinearProgress className="linear-progress" />
                        )}
                    </AppBar>
                )}
                <Container className="main-container">
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo} />} />
                        <Route path={'/todolist-ts'} element={<TodolistsList demo={demo} />} />
                        <Route path={'/login'} element={<Login />} />
                        <Route path={'/404'} element={<h1 className="not-found">404: PAGE NOT FOUND</h1>} />
                        <Route path={'*'} element={<Navigate to={'/404'} />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
