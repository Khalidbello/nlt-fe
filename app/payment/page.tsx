import Header from "@/components/multipurpose/header";
import AccountDetails from "@/components/payment/accont-details";


const Page: React.FC = () => {
    return (
        <div className="h-full w-full">
            <Header heading="Payment" />
            <AccountDetails />
        </div>
    )
}

export default Page;