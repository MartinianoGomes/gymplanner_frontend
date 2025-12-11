interface StatCardProps {
    title: string;
    value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center flex-1 min-w-0">
            <h3 className="text-gray-600 text-xs md:text-sm font-medium mb-1 md:mb-2 text-center whitespace-nowrap">
                {title}
            </h3>
            <span className="text-2xl md:text-3xl font-bold text-gray-800">{value}</span>
        </div>
    );
}
