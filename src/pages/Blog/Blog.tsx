import { useState } from "react";

type Tab = "workouts" | "diets";

interface Article {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    readTime: string;
}

const workoutArticles: Article[] = [
    {
        id: "1",
        title: "Treino de Peito Completo para Hipertrofia",
        description: "Descubra os melhores exercícios para desenvolver um peitoral forte e definido. Inclui supino reto, inclinado e exercícios de isolamento.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop",
        category: "Hipertrofia",
        readTime: "5 min"
    },
    {
        id: "2",
        title: "Guia Completo de Treino de Pernas",
        description: "Aprenda a treinar pernas de forma eficiente com agachamento, leg press, extensora e outros exercícios fundamentais.",
        image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=250&fit=crop",
        category: "Força",
        readTime: "7 min"
    },
    {
        id: "3",
        title: "Treino HIIT para Queima de Gordura",
        description: "Conheça o treino intervalado de alta intensidade que acelera o metabolismo e potencializa a queima calórica.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=250&fit=crop",
        category: "Cardio",
        readTime: "4 min"
    },
    {
        id: "4",
        title: "Como Montar um Treino de Costas Eficiente",
        description: "Exercícios essenciais para desenvolver largura e espessura nas costas, incluindo puxadas, remadas e pull-downs.",
        image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&h=250&fit=crop",
        category: "Hipertrofia",
        readTime: "6 min"
    },
    {
        id: "5",
        title: "Treino de Ombros: Deltoides Definidos",
        description: "Desenvolvimento completo dos três feixes do deltoide com exercícios de elevação e press militar.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=250&fit=crop",
        category: "Definição",
        readTime: "5 min"
    },
    {
        id: "6",
        title: "Treino Funcional: Movimentos do Dia a Dia",
        description: "Exercícios que melhoram sua performance em atividades cotidianas e previnem lesões.",
        image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop",
        category: "Funcional",
        readTime: "4 min"
    }
];

const dietArticles: Article[] = [
    {
        id: "1",
        title: "Dieta para Ganho de Massa Muscular",
        description: "Aprenda a montar um plano alimentar com superávit calórico e distribuição ideal de macronutrientes para hipertrofia.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
        category: "Bulking",
        readTime: "8 min"
    },
    {
        id: "2",
        title: "Café da Manhã Proteico: 5 Receitas",
        description: "Receitas deliciosas e ricas em proteína para começar o dia com energia e auxiliar na recuperação muscular.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=250&fit=crop",
        category: "Receitas",
        readTime: "5 min"
    },
    {
        id: "3",
        title: "Guia de Suplementação para Iniciantes",
        description: "Conheça os suplementos mais importantes: whey protein, creatina, BCAA e quando utilizá-los.",
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=250&fit=crop",
        category: "Suplementos",
        readTime: "6 min"
    },
    {
        id: "4",
        title: "Dieta Low Carb: Prós e Contras",
        description: "Entenda como funciona a dieta com baixo carboidrato e se ela é adequada para seus objetivos.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
        category: "Emagrecimento",
        readTime: "7 min"
    },
    {
        id: "5",
        title: "Refeições Pré e Pós-Treino Ideais",
        description: "O que comer antes e depois do treino para maximizar performance e recuperação muscular.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop",
        category: "Nutrição",
        readTime: "5 min"
    },
    {
        id: "6",
        title: "Meal Prep: Organize sua Semana",
        description: "Dicas práticas para preparar suas refeições da semana e manter a dieta em dia mesmo com a rotina corrida.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop",
        category: "Organização",
        readTime: "6 min"
    }
];

export default function Blog() {
    const [activeTab, setActiveTab] = useState<Tab>("workouts");

    const articles = activeTab === "workouts" ? workoutArticles : dietArticles;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <div className="w-full max-w-6xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Blog GymPlanner
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3">
                        Dicas e Sugestões
                    </h1>
                    <p className="text-dark-lighter text-base md:text-lg max-w-md mx-auto">
                        Artigos sobre treinos, nutrição e bem-estar para alcançar seus objetivos
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex gap-1">
                        <button
                            onClick={() => setActiveTab("workouts")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "workouts"
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                            </svg>
                            Sugestões de Treino
                        </button>
                        <button
                            onClick={() => setActiveTab("diets")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "diets"
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Sugestões de Dietas
                        </button>
                    </div>
                </div>

                {/* Grid de Artigos */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-pointer"
                        >
                            {/* Imagem */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm text-dark text-xs font-medium px-2.5 py-1 rounded-lg">
                                        {article.category}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className="bg-dark/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {article.readTime}
                                    </span>
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-5">
                                <h3 className="font-semibold text-dark text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-dark-lighter text-sm leading-relaxed line-clamp-3">
                                    {article.description}
                                </p>

                                {/* Botão Ler Mais */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <button className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                        Ler artigo
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-3">
                        Quer receber mais dicas?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-md mx-auto">
                        Novos artigos são adicionados semanalmente. Volte sempre para conferir as novidades!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                            Ver todos os artigos
                        </button>
                        <button className="bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                            Sugerir tema
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
