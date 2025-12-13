interface StatCardProps {
    title: string;
    value: number;
    icon?: "exercise" | "days" | "muscle";
}

const icons = {
    exercise: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
        </svg>
    ),
    days: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    muscle: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
    ),
};

export default function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center flex-1 min-w-0 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            {icon && (
                <div className="mb-2 md:mb-3 p-2.5 bg-primary/10 rounded-xl">
                    {icons[icon]}
                </div>
            )}
            <span className="text-3xl md:text-4xl font-bold text-dark mb-1">{value}</span>
            <h3 className="text-dark-lighter text-xs md:text-sm font-medium text-center">
                {title}
            </h3>
        </div>
    );
}
