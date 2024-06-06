import { VscLoading } from "react-icons/vsc";

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <VscLoading className="text-2xl animate-spin" />
        </div>
    );
}