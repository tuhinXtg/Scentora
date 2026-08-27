interface ToastProps {
    message: string;
    visible: boolean;
}

function Toast({ message, visible }: ToastProps) {
    if (!visible) {
        return null;
    }

    return (
        <div className="fixed right-5 top-5 z-50 rounded-xl bg-gray-900 px-5 py-4 text-sm font-medium text-white shadow-lg">
            <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm">
                    ✓
                </span>

                <span>{message}</span>
            </div>
        </div>
    );
}

export default Toast;