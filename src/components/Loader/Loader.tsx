import { MagnifyingGlass } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div>
            <MagnifyingGlass
                visible={true}
                height="40"
                width="40"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    );
};

export default Loader;