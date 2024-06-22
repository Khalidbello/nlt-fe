// Notification.tsx

interface NotificationProps {
    type: "success" | "error" | "info";
    message: string;
    viewed: boolean;
    date: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message, viewed, date }) => {
    const classes = {
        success: "bg-green-100 text-green-600",
        error: "bg-red-100 text-red-500",
        info: "bg-blue-100 text-blue-500",
    };

    return (
        <div
            className={`p-4 rounded-md shadow-sm ${classes[type]} ${!viewed && 'bg-opacity-80'} rounded-xl p-4 mb-4 mx-3`}
            role="alert"
        >
            <p className="font-medium">{message}</p>
            <p className="text-xs text-right"> {date}</p>
        </div>
    );
};

export default Notification;
