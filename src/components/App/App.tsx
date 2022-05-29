import React from 'react';
import url from '@/assets/images/test.jpg';
import styles from './App.module.scss';

export default function App() {
    return (
        <div className={styles.app}>
            <h1 className={styles.title + ' global'}>
                <span className={styles.icon} />
                App component
            </h1>
            <img src={url} />
        </div>
    );
}
