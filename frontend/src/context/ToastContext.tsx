import {
    useRef,
    useState,
    type ReactNode,
} from "react";

import Toast from "../components/Toast";
import { ToastContext } from "./ToastContextValue";

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({
    children,
}: ToastProviderProps) {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    function showToast(newMessage: string) {
        setMessage(newMessage);
        setVisible(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setVisible(false);
        }, 2500);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <Toast
                message={message}
                visible={visible}
            />
        </ToastContext.Provider>
    );
}