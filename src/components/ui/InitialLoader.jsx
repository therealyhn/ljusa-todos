const InitialLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6">
            <div className="h-10 w-10 rounded-full border border-white/20 border-t-white animate-spin" />
            {/* <p className="text-xs uppercase tracking-[0.6em] text-secondary">
                X T Y
            </p> */}
        </div>
    );
};

export default InitialLoader;
