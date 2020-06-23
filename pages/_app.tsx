import '../styles.scss'

// This default export is required in a new `pages/_app.js` file.
const App: React.FC<{
    Component: React.FC<any>,
    pageProps: any
}> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default App;
