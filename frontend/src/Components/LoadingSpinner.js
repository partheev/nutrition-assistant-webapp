import Loading from 'react-fullscreen-loading';

export const FullPageLoading = ({ isLoading, background }) => {
    return (
        <Loading
            loading={isLoading}
            background={background}
            loaderColor={'var(--themecolor)'}
        />
    );
};
