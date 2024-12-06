import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHouse, faChartLine, faWallet, faChartPie, faEnvelope, faSliders, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

// Глобальные стили
const GlobalStyle = createGlobalStyle`
    :root {
        --transition: 0.5s ease-in-out;

        // Default light theme
        --color-sidebar-background: #fff;
        --color-sidebar-hover: #f0f2ff;
        --color-sidebar-active: #f0f2ff;
        --color-text-default: #97a5b9;
        --color-text-hover: #091b31;
        --color-text-active: #0000b5;
        --color-logo: #0000b5;
        --color-button-background: #fff;
        --color-button-active: #e2e8f0;
    }
`;

// Styled-components
const SidebarContainer = styled.div`
    background-color: var(--color-sidebar-background);
    color: var(--color-text-default);
    width: ${(props) => (props.isOpened ? '250px' : '80px')};
    transition: var(--transition);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0 15px 15px 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isOpened ? 'flex-end' : 'center')};
    padding: 1rem;
    cursor: pointer;

    svg {
        font-size: 1.5rem;
        color: var(--color-button-background);
        transition: color var(--transition);
    }

    &:hover svg {
        color: var(--color-button-active);
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    justify-content: ${(props) => (props.isOpened ? 'flex-start' : 'center')};
    transition: justify-content var(--transition);

    img {
        width: 50px;
        height: auto;
    }

    span {
        margin-left: ${(props) => (props.isOpened ? '1rem' : '0')};
        display: ${(props) => (props.isOpened ? 'inline-block' : 'none')};
        color: var(--color-logo);
        font-weight: bold;
    }
`;

const RouteContainerUp = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 1rem;

    div {
        display: flex;
        align-items: center;
        justify-content: ${(props) => (props.isOpened ? 'flex-start' : 'center')};
        padding: 0 1rem;
        cursor: pointer;
        transition: background-color var(--transition);

        &:hover {
            background-color: ${(props) => props.theme.sidebarHover};

        }

        span {
            margin-left: 1rem;
            display: ${(props) => (props.isOpened ? 'inline-block' : 'none')};
        }
    }
`;

const RouteContainerDown = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 2rem 0;
    gap: 1rem;

    div {
        display: flex;
        align-items: center;
        justify-content: ${(props) => (props.isOpened ? 'flex-start' : 'center')};
        padding: 0 1rem;
        cursor: pointer;
        transition: background-color var(--transition);

        &:hover {
            background-color: ${(props) => props.theme.sidebarHover};

        }

        span {
            margin-left: 1rem;
            display: ${(props) => (props.isOpened ? 'inline-block' : 'none')};
        }
    }
`;

// Маршруты
const routes = [
    { title: 'Home', icon: faHouse, path: '/' },
    { title: 'Sales', icon: faChartLine, path: '/sales' },
    { title: 'Costs', icon: faChartLine, path: '/costs' },
    { title: 'Payments', icon: faWallet, path: '/payments' },
    { title: 'Finances', icon: faChartPie, path: '/finances' },
    { title: 'Messages', icon: faEnvelope, path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: faSliders, path: '/settings' },
    { title: 'Support', icon: faPhoneVolume, path: '/support' },
];

// Sidebar-компонент
const Sidebar = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [theme, setTheme] = useState('light');

    // Установка темы из браузера, если в браузере стоит тема Устройства
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = (isDarkMode) => setTheme(isDarkMode ? 'dark' : 'light');

        // Установить текущую тему
        applyTheme(mediaQuery.matches);

        // Добавить слушатель для отслеживания изменений
        const handleChange = (e) => applyTheme(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Применение темы
    useEffect(() => {
        const root = document.documentElement;
        const themes = {
            light: {
                '--color-sidebar-background': '#fff',
                '--color-sidebar-hover': '#f0f2ff',
                '--color-sidebar-active': '#f0f2ff',
                '--color-text-default': '#97a5b9',
                '--color-text-hover': '#091b31',
                '--color-text-active': '#0000b5',
                '--color-logo': '#0000b5',
                '--color-button-background': '#fff',
                '--color-button-active': '#e2e8f0',
            },
            dark: {
                '--color-sidebar-background': '#202127',
                '--color-sidebar-hover': '#2D2E34',
                '--color-sidebar-active': '#393A3F',
                '--color-text-default': '#f0f2ff',
                '--color-text-hover': '#f0f2ff',
                '--color-text-active': '#f0f2ff',
                '--color-logo': '#3B82F6',
                '--color-button-background': '#202127',
                '--color-button-active': '#4B5966',
            },
        };

        const selectedTheme = themes[theme];
        Object.entries(selectedTheme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [theme]);

    const toggleSidebar = () => setIsOpened((prev) => !prev);

    return (
        <>
            <GlobalStyle />
            <SidebarContainer isOpened={isOpened}>
                {/* Открытие/закрытие сайдбара */}
                <ToggleButton isOpened={isOpened} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={isOpened ? faAngleLeft : faAngleRight} />
                </ToggleButton>
                {/* Лого */}
                <LogoContainer isOpened={isOpened}>
                    <img src={logo} alt="Logo" />
                    <span>TensorFlow</span>
                </LogoContainer>
                {/* Основные маршруты */}
                <RouteContainerUp isOpened={isOpened}>
                    {routes.map((route) => (
                        <div key={route.title}>
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </div>
                    ))}
                </RouteContainerUp>

                {/* Нижние маршруты */}
                <RouteContainerDown isBottom isOpened={isOpened}>
                    {bottomRoutes.map((route) => (
                        <div key={route.title}>
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </div>
                    ))}
                </RouteContainerDown>
            </SidebarContainer>
        </>
    );
};

export default Sidebar;
