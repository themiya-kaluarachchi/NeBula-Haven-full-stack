export default function Loader({ fullScreen = false }) {
    return (
        <div className={
            fullScreen
            ? "fixed inset-0 flex items-center justify-center"
            : "w-full h-full flex items-center justify-center"
        }>
            <div className="border-[3px] border-accent border-b-transparent rounded-full w-[100px] h-[100px] animate-spin"></div>
        </div>
    );
}