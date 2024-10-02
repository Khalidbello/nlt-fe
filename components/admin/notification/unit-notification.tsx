// Notification.tsx

interface NotificationProps {
    type: "success" | "error" | "info";
    message: string;
    viewed: boolean;
    date: Date;
}

const Notification: React.FC<NotificationProps> = ({ type, message, viewed, date }) => {
    console.log('dateeeeeeeeeeee', date);
    const classes = {
        success: "bg-green-100 text-green-600",
        error: "bg-red-100 text-red-500",
        info: "bg-blue-100 text-blue-500",
    };

    const bg = {
        success: "bg-green-600",
        error: "bg-red-500",
        info: "bg-blue-500",
    };

    const convertDateFormat = (date: Date) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("en-US", { month: "short" });
        const day = dateObj.getDate(); // Get the numeric day of the month
        const year = dateObj.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <div
            className={`p-4 rounded-md shadow-sm ${classes[type]} rounded-xl p-4 mb-4 mx-3 relative`}
            role="alert"
        >
            {!viewed && <div className={`absolute top-3 right-3 w-3 h-3 rounded-full  ${bg[type]}`}></div>}
            <p className="mt-3 font-medium">{message}</p>
            <p className="text-xs text-right"> {convertDateFormat(date)}</p>
        </div>
    );
};

export default Notification;
