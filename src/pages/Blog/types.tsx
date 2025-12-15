export type Tab = "workouts" | "diets";

export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    category: string;
    readTime: string;
    author: string;
    date: string;
}
