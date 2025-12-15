import { useState } from "react";
import { toast } from "sonner";
import type { Tab, Article } from "./types";
import { workoutArticles, dietArticles } from "./data";

export default function Blog() {
    const [activeTab, setActiveTab] = useState<Tab>("workouts");
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [suggestionText, setSuggestionText] = useState("");

    const articles = activeTab === "workouts" ? workoutArticles : dietArticles;

    const categories = ["all", ...new Set(articles.map(a => a.category))];

    const filteredArticles = selectedCategory === "all"
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    const handleSendSuggestion = () => {
        if (!suggestionText.trim()) {
            toast.error("Digite sua sugestão de tema");
            return;
        }
        toast.success("Sugestão enviada com sucesso! Obrigado pelo feedback.");
        setSuggestionText("");
        setShowSuggestionModal(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full">
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
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex gap-1">
                        <button
                            onClick={() => {
                                setActiveTab("workouts");
                                setSelectedCategory("all");
                            }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "workouts"
                                ? "bg-linear-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                            </svg>
                            Sugestões de Treino
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("diets");
                                setSelectedCategory("all");
                            }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "diets"
                                ? "bg-linear-to-r from-primary to-primary-light text-white shadow-sm"
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

                {/* Filtro por Categoria */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === category
                                ? "bg-primary text-white"
                                : "bg-white text-dark-lighter hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {category === "all" ? "Todos" : category}
                        </button>
                    ))}
                </div>

                {/* Grid de Artigos */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredArticles.map((article) => (
                        <article
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
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
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-dark-lighter">{article.date}</span>
                                    <span className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                        Ler artigo
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 bg-linear-to-r from-primary to-primary-light rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-3">
                        Quer receber mais dicas?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-md mx-auto">
                        Novos artigos são adicionados semanalmente. Tem alguma sugestão de tema?
                    </p>
                    <button
                        onClick={() => setShowSuggestionModal(true)}
                        className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        Sugerir tema
                    </button>
                </div>
            </div>

            {/* Modal de Artigo */}
            {selectedArticle && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header da imagem */}
                        <div className="relative h-48 md:h-64">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                            >
                                <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                                        {selectedArticle.category}
                                    </span>
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                                        {selectedArticle.readTime} de leitura
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-white">
                                    {selectedArticle.title}
                                </h2>
                            </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
                            <div className="flex items-center gap-4 text-sm text-dark-lighter mb-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span>{selectedArticle.author}</span>
                                </div>
                                <span>•</span>
                                <span>{selectedArticle.date}</span>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                <p className="text-dark-lighter text-base leading-relaxed mb-4">
                                    {selectedArticle.description}
                                </p>
                                <div className="text-dark whitespace-pre-line leading-relaxed">
                                    {selectedArticle.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Sugestão */}
            {showSuggestionModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowSuggestionModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-dark">Sugerir Tema</h3>
                            <button
                                onClick={() => setShowSuggestionModal(false)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-dark-lighter text-sm mb-4">
                            Qual tema você gostaria de ver no blog? Sua sugestão nos ajuda a criar conteúdo relevante!
                        </p>

                        <textarea
                            value={suggestionText}
                            onChange={(e) => setSuggestionText(e.target.value)}
                            placeholder="Ex: Como treinar em casa sem equipamentos..."
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus resize-none mb-4"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSuggestionModal(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark font-medium rounded-xl transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSendSuggestion}
                                className="flex-1 px-4 py-2.5 bg-linear-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all"
                            >
                                Enviar Sugestão
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
