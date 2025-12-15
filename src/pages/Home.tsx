import React from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  ChartNoAxesCombined,
  Check,
  Grid2x2Check,
  PersonStanding,
  Plus,
  Star,
} from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition">
                GYM<span className="text-primary">PLANNER</span>
              </button>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium"
              >
                Recursos
              </a>
              <a
                href="#preview"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium"
              >
                Sobre
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium"
              >
                Depoimentos
              </a>
              <div className="flex items-center space-x-4 ml-4">
                <button 
                  onClick={() => navigate("/login")}
                  className="text-dark font-medium hover:text-primary transition">
                  Entrar
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium transition shadow-lg">
                  Criar conta
                </button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-dark-lighter hover:text-primary">
                <span className="material-icons-round text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HEADER / HERO ==================== */}
      <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                Planejador de treinos nº 1
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-dark leading-tight">
                Construa o{" "}
                <br />
                <span className="text-primary">
                  físico dos sonhos
                </span>
              </h1>
              <p className="text-xl text-dark-lighter max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Planejar seus treinos não precisa ser um treino. Organize sua
                rotina, acompanhe sua evolução e bata suas metas com o
                GymPlanner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate("/register")}
                  className="bg-primary hover:bg-primary-dark text-white text-lg px-8 py-4 rounded-xl font-bold transition transform hover:-translate-y-1 shadow-xl flex items-center justify-center">
                  Registrar
                </button>
              </div>
              <div className="pt-8 flex items-center justify-center lg:justify-start space-x-6 text-dark-muted text-sm font-medium">
                <div className="flex items-center">
                  Plano gratuito disponível
                </div>
                <div className="flex items-center">
                  Sem cartão de crédito
                </div>
              </div>
            </div>

            <div className="relative lg:ml-10">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl filter opacity-50 animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary-dark/20 rounded-full blur-3xl filter opacity-50" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform rotate-1 hover:rotate-0 transition duration-500">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGtI1jo_gIL3NidGoIvrzhBu30t0CaZg09eBiBGQdKrNd9eTGZTa9_juZsXi3a4dhyMewoIVkYhEd9fVNcv4tHUyuuWGy9-MpM8v7gAbKKcAvCVsyK84qSKE0w33-Jh4fRNTaQjFgn-ocjuhDxo25gf2UsPa9Nc5ejhaLdSMZ4FJn2qfj_jjnJSXFVfBgho9v5QVWSx5KO9yv4BrjODiLI-x9LycSZE4GhCEG36rK8aGDzF_2v8Fi6g28kzXFGfMSExLlJEYmkvKM"
                  alt="Atleta treinando na academia"
                  className="w-full h-auto object-cover"
                />
                <div
                  className="absolute bottom-6 left-6 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs animate-bounce"
                  style={{ animationDuration: "3s" }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                        Progresso semanal
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        +15% de força
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== FEATURES SECTION ==================== */}
      <section
        id="features"
        className="py-20 bg-white dark:bg-surface-dark transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
              Tudo o que você precisa para evoluir
            </p>
            <p className="mt-4 max-w-2xl text-xl text-dark-muted mx-auto">
              De treinos para iniciantes a divisões avançadas, o GymPlanner se
              adapta ao seu estilo de treino.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 hover:shadow-lg transition duration-300 border border-transparent hover:border-primary/20">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Calendar size={25} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                Agenda personalizada
              </h3>
              <p className="text-dark-lighter leading-relaxed">
                Planeje sua semana com antecedência. Arraste e solte treinos
                para encaixar na sua rotina corrida. Nunca mais falhe no dia de
                pernas.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 hover:shadow-lg transition duration-300 border border-transparent hover:border-primary/20">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <PersonStanding size={25} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                Foco em grupos musculares
              </h3>
              <p className="text-dark-lighter leading-relaxed">
                Escolha quais grupos musculares quer priorizar. O mapa corporal
                visual ajuda a garantir um treino equilibrado.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 hover:shadow-lg transition duration-300 border border-transparent hover:border-primary/20">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <ChartNoAxesCombined size={25} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                Análises de progresso
              </h3>
              <p className="text-dark-lighter leading-relaxed">
                Visualize seus ganhos com gráficos intuitivos. Acompanhe carga,
                repetições e medidas corporais ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PREVIEW / HOW IT WORKS ==================== */}
      <section
        id="preview"
        className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-dark rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg" />
              <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-2xl font-bold text-dark">
                    Meus treinos
                  </h3>
                  <span className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition">
                  <Plus size={25} strokeWidth={2.5} />
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-dark-lighter font-bold shadow-sm">
                        S
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark group-hover:text-primary transition">
                          Peito e tríceps
                        </h4>
                        <p className="text-xs text-dark-muted">
                          45 min • 6 exercícios
                        </p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-primary shadow shadow-primary/50" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-dark-lighter font-bold shadow-sm">
                        T
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark group-hover:text-primary transition">
                          Costas e bíceps
                        </h4>
                        <p className="text-xs text-dark-muted">
                          50 min • 7 exercícios
                        </p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-yellow-300" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-dark-lighter font-bold shadow-sm">
                        Q
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark group-hover:text-primary transition">
                          Dia de descanso
                        </h4>
                        <p className="text-xs text-dark-muted">Recuperação ativa</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-dark-lighter font-bold shadow-sm">
                        S
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark group-hover:text-primary transition">
                          Pernas e ombros
                        </h4>
                        <p className="text-xs text-dark-muted">
                          60 min • 8 exercícios
                        </p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-primary shadow shadow-primary/50" />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <Grid2x2Check size={25} strokeWidth={2.5} />
              </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
                        Controle total dos seus{" "}
            <span className="text-primary">treinos em um só lugar</span>
                </h2>
              <p className="text-lg text-dark-lighter leading-relaxed">
                A GymPlanner foi criada para simplificar sua rotina na academia. Registre exercícios, séries, repetições e cargas de forma rápida e acompanhe sua evolução ao longo do tempo. Tenha uma visão clara dos seus treinos semanais e mantenha o foco no que realmente importa: evoluir com consistência.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start">
                  <span className="material-icons-round text-primary mr-3 mt-1">
                    <Check size={20} strokeWidth={2.5} />
                  </span>
                  <span className="text-dark-lighter">
                    Construtor de rotina com arrastar e soltar
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons-round text-primary mr-3 mt-1">
                    <Check size={20} strokeWidth={2.5} />
                  </span>
                  <span className="text-dark-lighter">
                    Histórico inteligente de cargas anteriores
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons-round text-primary mr-3 mt-1">
                    <Check size={20} strokeWidth={2.5} />
                  </span>
                  <span className="text-dark-lighter">
                    Mapas de calor musculares visuais
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MUSCLE GROUPS ==================== */}
      <section className="py-20 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-dark mb-12">
            Treine todos os grupos musculares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Substituição de aspect-square por altura fixa responsiva - melhor compatibilidade */}
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer w-full h-48 sm:h-56 md:h-64">
              <img
                src="/abdomen.jpg"
                alt="Treino de corpo"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-wider">
                  ABDÔMEN
                </span>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden cursor-pointer w-full h-48 sm:h-56 md:h-64">
              <img
                src="/braco.jpg"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-wider">
                  BRAÇOS
                </span>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden cursor-pointer w-full h-48 sm:h-56 md:h-64">
              <img
                src="/perna.jpg"
                alt="Treino de pernas"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-wider">
                  PERNAS
                </span>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden cursor-pointer w-full h-48 sm:h-56 md:h-64">
              <img
                src="/costa.jpg"
                alt="Treino de costas"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-wider">
                  COSTAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section
        id="testimonials"
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-16">
            Feedback de quem escolheu o GymPlanner
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex">
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                </div>
            </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-justify">
                "O GymPlanner facilitou muito minha rotina na academia. Consigo registrar os treinos rápido, acompanhar minha evolução e não dependo mais do bloco de notas."
              </p>
              <div className="flex items-center">
                <img
                  src="/gato1.jpg"
                  alt="Usuário"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-dark text-sm">
                    Diogo Leiticio
                  </p>
                  <p className="text-gray-500 text-xs">Repositor do Atacadão</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-justify">
                “Acompanhar meu desempenho ao longo das semanas mudou minha forma de treinar. Ver a evolução registrada me dá mais foco e me ajuda a não desistir.”
              </p>
              <div className="flex items-center">
                <img
                  src="/gato3.jpg"
                  alt="Usuária"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-dark text-sm">
                    Jonas Leitado
                  </p>
                  <p className="text-gray-500 text-xs">Engenheiro de Pesca</p>
                </div>
              </div>
            </div>
              
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                     <Star size={20} fill="currentColor" className="text-primary" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-justify">
                “Ter meus treinos registrados me fez enxergar minha evolução com mais clareza. Isso aumentou meu foco e me deu motivação para continuar mesmo nos dias difíceis.”
              </p>
              <div className="flex items-center">
                <img
                  src="/gato2.jpg"
                  alt="Usuária"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-dark text-sm">
                    Miqueias Chupetão
                  </p>
                  <p className="text-gray-500 text-xs">Jogador de Lol</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-surface-dark">
        <div className="absolute inset-0 bg-primary opacity-90 dark:opacity-80" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Pronto para alcançar suas metas?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de atletas que estão levando os treinos para o
            próximo nível com o GymPlanner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/register")}
              className="bg-white text-primary text-lg px-8 py-4 rounded-xl font-bold transition hover:bg-gray-100 shadow-xl">
              Criar conta gratuita
            </button>
            <button className="bg-transparent border-2 border-white text-white text-lg px-8 py-4 rounded-xl font-bold transition hover:bg-white/10">
              Baixar aplicativo
            </button>
          </div>
          <p className="mt-6 text-white/75 text-sm opacity-80">
            Nenhum cartão de crédito é necessário. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center mb-4">
                <span className="font-bold text-xl tracking-tight text-dark">
                  GYM<span className="text-primary">PLANNER</span>
                </span>
              </div>
              <p className="text-dark-muted text-sm leading-relaxed max-w-xs">
                A ferramenta ideal para quem leva treino a sério. Planeje,
                registre e visualize sua evolução em um só lugar.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-dark mb-4">
                Produto
              </h4>
              <ul className="space-y-2 text-sm text-dark-muted">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Baixar app
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-dark mb-4">
                Recursos
              </h4>
              <ul className="space-y-2 text-sm text-dark-muted">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Comunidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Central de ajuda
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-dark mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-dark-muted">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-center items-center w-full">
            <p className="text-dark-muted text-sm mb-4 md:mb-0 text-center">
              © 2023 GymPlanner Inc. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
