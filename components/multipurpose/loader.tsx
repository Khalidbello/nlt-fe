const LoadingAnimation: React.FC<{ h: string }> = ({ h }) => {
    return (
        <div className={`flex items-center justify-center w-full ${h} max-h-full`}>
            <div className="animate-spin rounded-full h-full aspect-square border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
};

export default LoadingAnimation;