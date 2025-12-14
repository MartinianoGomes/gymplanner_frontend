import { useState } from "react";
import { toast } from "sonner";

type Tab = "workouts" | "diets";

interface Article {
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

const workoutArticles: Article[] = [
    {
        id: "w1",
        title: "Treino de Peito Completo para Hipertrofia",
        description: "Descubra os melhores exercícios para desenvolver um peitoral forte e definido. Inclui supino reto, inclinado e exercícios de isolamento.",
        content: `O peitoral é um dos grupos musculares mais desejados para desenvolver. Um treino completo deve incluir:

**Exercícios Compostos:**
• Supino Reto com Barra: 4 séries de 8-10 repetições
• Supino Inclinado com Halteres: 4 séries de 10-12 repetições
• Supino Declinado: 3 séries de 10-12 repetições

**Exercícios de Isolamento:**
• Crucifixo na Máquina: 3 séries de 12-15 repetições
• Crossover no Cabo: 3 séries de 15 repetições
• Pullover com Halter: 3 séries de 12 repetições

**Dicas Importantes:**
1. Sempre aqueça adequadamente antes de começar
2. Foque na conexão mente-músculo
3. Controle a fase excêntrica (descida) do movimento
4. Descanse 60-90 segundos entre as séries
5. Treine peito no máximo 2x por semana para recuperação adequada`,
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
        category: "Hipertrofia",
        readTime: "5 min",
        author: "GymPlanner",
        date: "10 Dez 2024"
    },
    {
        id: "w2",
        title: "Guia Completo de Treino de Pernas",
        description: "Aprenda a treinar pernas de forma eficiente com agachamento, leg press, extensora e outros exercícios fundamentais.",
        content: `Pernas fortes são a base de um físico equilibrado. Confira o treino completo:

**Exercícios para Quadríceps:**
• Agachamento Livre: 4 séries de 8-10 repetições
• Leg Press 45°: 4 séries de 12-15 repetições
• Extensora: 3 séries de 15 repetições
• Agachamento Hack: 3 séries de 10-12 repetições

**Exercícios para Posterior:**
• Stiff com Barra: 4 séries de 10-12 repetições
• Mesa Flexora: 3 séries de 12-15 repetições
• Cadeira Flexora: 3 séries de 15 repetições

**Exercícios para Glúteos:**
• Hip Thrust: 4 séries de 12 repetições
• Elevação Pélvica: 3 séries de 15 repetições
• Abdução na Máquina: 3 séries de 15 repetições

**Panturrilhas:**
• Elevação de Panturrilha em Pé: 4 séries de 15-20 repetições
• Elevação de Panturrilha Sentado: 3 séries de 20 repetições`,
        image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&h=400&fit=crop",
        category: "Força",
        readTime: "7 min",
        author: "GymPlanner",
        date: "08 Dez 2024"
    },
    {
        id: "w3",
        title: "Treino HIIT para Queima de Gordura",
        description: "Conheça o treino intervalado de alta intensidade que acelera o metabolismo e potencializa a queima calórica.",
        content: `O HIIT (High-Intensity Interval Training) é uma das formas mais eficientes de queimar gordura:

**O que é HIIT?**
Treino intervalado que alterna períodos de alta intensidade com recuperação ativa ou descanso.

**Treino HIIT de 20 minutos:**

**Aquecimento (3 min):**
• Polichinelos: 1 minuto
• Corrida no lugar: 1 minuto
• Rotação de quadril: 1 minuto

**Circuito Principal (15 min - 3 rounds):**
• Burpees: 30 segundos ON / 15 segundos OFF
• Mountain Climbers: 30 segundos ON / 15 segundos OFF
• Jump Squats: 30 segundos ON / 15 segundos OFF
• Prancha com toque no ombro: 30 segundos ON / 15 segundos OFF
• Descanso: 1 minuto entre rounds

**Volta à calma (2 min):**
• Caminhada leve e alongamentos

**Benefícios:**
✓ Queima até 30% mais calorias que treino tradicional
✓ Efeito EPOC: continua queimando calorias após o treino
✓ Melhora condicionamento cardiovascular
✓ Pode ser feito em qualquer lugar`,
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop",
        category: "Cardio",
        readTime: "4 min",
        author: "GymPlanner",
        date: "05 Dez 2024"
    },
    {
        id: "w4",
        title: "Como Montar um Treino de Costas Eficiente",
        description: "Exercícios essenciais para desenvolver largura e espessura nas costas, incluindo puxadas, remadas e pull-downs.",
        content: `Uma costas bem desenvolvida é sinônimo de força e estética:

**Para Largura (Dorsais):**
• Puxada Frontal: 4 séries de 10-12 repetições
• Puxada Triângulo: 3 séries de 12 repetições
• Pulldown com Corda: 3 séries de 15 repetições

**Para Espessura:**
• Remada Curvada com Barra: 4 séries de 8-10 repetições
• Remada Unilateral com Halter: 3 séries de 10-12 cada lado
• Remada Cavalinho: 3 séries de 12 repetições
• Remada Baixa no Cabo: 3 séries de 12-15 repetições

**Exercícios Complementares:**
• Pullover na Polia: 3 séries de 12-15 repetições
• Encolhimento para Trapézio: 4 séries de 12-15 repetições

**Dicas de Execução:**
1. Puxe com os cotovelos, não com as mãos
2. Contraia as escápulas no final do movimento
3. Evite usar impulso do corpo
4. Mantenha o core ativado durante todo exercício`,
        image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&h=400&fit=crop",
        category: "Hipertrofia",
        readTime: "6 min",
        author: "GymPlanner",
        date: "03 Dez 2024"
    },
    {
        id: "w5",
        title: "Treino de Ombros: Deltoides Definidos",
        description: "Desenvolvimento completo dos três feixes do deltoide com exercícios de elevação e press militar.",
        content: `Os ombros dão a impressão de um físico mais largo e atlético:

**Deltoide Anterior:**
• Desenvolvimento com Barra: 4 séries de 8-10 repetições
• Desenvolvimento com Halteres: 3 séries de 10-12 repetições
• Elevação Frontal: 3 séries de 12-15 repetições

**Deltoide Lateral:**
• Elevação Lateral com Halteres: 4 séries de 12-15 repetições
• Elevação Lateral no Cabo: 3 séries de 15 repetições
• Elevação Lateral na Máquina: 3 séries de 15 repetições

**Deltoide Posterior:**
• Crucifixo Inverso: 4 séries de 12-15 repetições
• Face Pull: 3 séries de 15 repetições
• Elevação Posterior Curvado: 3 séries de 15 repetições

**Sequência Ideal:**
1. Comece com exercícios compostos (desenvolvimento)
2. Trabalhe o deltoide lateral (prioridade estética)
3. Finalize com posterior (geralmente negligenciado)

**Cuidados:**
⚠️ Evite cargas muito pesadas em elevações laterais
⚠️ Não eleve os ombros ao fazer elevação frontal
⚠️ Mantenha os cotovelos levemente flexionados`,
        image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=400&fit=crop",
        category: "Definição",
        readTime: "5 min",
        author: "GymPlanner",
        date: "01 Dez 2024"
    },
    {
        id: "w6",
        title: "Treino Funcional: Movimentos do Dia a Dia",
        description: "Exercícios que melhoram sua performance em atividades cotidianas e previnem lesões.",
        content: `O treino funcional prepara seu corpo para a vida real:

**O que é Treino Funcional?**
São exercícios que simulam movimentos naturais do corpo, melhorando força, equilíbrio, coordenação e flexibilidade.

**Circuito Funcional (40 min):**

**Aquecimento Dinâmico (5 min):**
• Mobilidade articular completa

**Bloco 1 - Força (15 min):**
• Agachamento Goblet: 3x12
• Deadlift Romeno Unilateral: 3x10 cada lado
• Push-up com Rotação: 3x10
• Remada com Kettlebell: 3x12

**Bloco 2 - Core e Estabilidade (10 min):**
• Prancha com Alcance: 3x10 cada lado
• Bird Dog: 3x12 cada lado
• Dead Bug: 3x10 cada lado
• Farmer's Walk: 3x30 segundos

**Bloco 3 - Cardio Funcional (8 min):**
• Box Step-ups: 2x20
• Medicine Ball Slam: 2x15
• Kettlebell Swing: 2x15

**Benefícios:**
✓ Melhora postura
✓ Previne lesões
✓ Aumenta mobilidade
✓ Transferência para esportes e vida diária`,
        image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=400&fit=crop",
        category: "Funcional",
        readTime: "4 min",
        author: "GymPlanner",
        date: "28 Nov 2024"
    }
];

const dietArticles: Article[] = [
    {
        id: "d1",
        title: "Dieta para Ganho de Massa Muscular",
        description: "Aprenda a montar um plano alimentar com superávit calórico e distribuição ideal de macronutrientes para hipertrofia.",
        content: `Para ganhar massa muscular, você precisa de superávit calórico adequado:

**Calculando suas Necessidades:**
• TMB (Taxa Metabólica Basal) + Atividade Física + 300-500 kcal

**Distribuição de Macros:**
• Proteína: 1.8-2.2g por kg de peso corporal
• Carboidratos: 4-6g por kg de peso corporal
• Gorduras: 0.8-1g por kg de peso corporal

**Exemplo para 80kg (Bulking):**
• Calorias: ~3000-3200 kcal/dia
• Proteína: 160g (640 kcal)
• Carboidratos: 400g (1600 kcal)
• Gorduras: 80g (720 kcal)

**Melhores Fontes:**
🥩 Proteínas: Frango, carne, peixe, ovos, whey
🍚 Carboidratos: Arroz, batata, aveia, frutas
🥑 Gorduras: Abacate, azeite, castanhas, amendoim

**Timing Nutricional:**
• Pré-treino (1-2h antes): Carbs complexos + proteína
• Pós-treino (até 2h): Carbs simples + proteína rápida
• Antes de dormir: Proteína de absorção lenta (caseína)

**Dicas Importantes:**
1. Coma a cada 3-4 horas
2. Hidrate-se bem (mínimo 35ml/kg de peso)
3. Priorize alimentos naturais
4. Suplementos complementam, não substituem`,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
        category: "Bulking",
        readTime: "8 min",
        author: "GymPlanner",
        date: "12 Dez 2024"
    },
    {
        id: "d2",
        title: "Café da Manhã Proteico: 5 Receitas",
        description: "Receitas deliciosas e ricas em proteína para começar o dia com energia e auxiliar na recuperação muscular.",
        content: `Começar o dia com proteína adequada é essencial:

**1. Panqueca Proteica de Banana**
• 1 banana amassada
• 2 ovos
• 1 scoop de whey
• Canela a gosto
→ Misture tudo e faça na frigideira antiaderente
📊 ~30g proteína

**2. Overnight Oats Proteico**
• 1/2 xícara de aveia
• 1 scoop de whey
• 200ml de leite
• Frutas vermelhas
→ Deixe na geladeira durante a noite
📊 ~35g proteína

**3. Omelete Fitness**
• 3 ovos inteiros
• 50g de peito de peru
• Queijo cottage
• Espinafre
→ Misture os ovos e adicione os recheios
📊 ~32g proteína

**4. Bowl de Iogurte Grego**
• 200g de iogurte grego
• 1 scoop de whey
• Granola low sugar
• Mel e frutas
📊 ~40g proteína

**5. Wrap de Frango**
• 1 wrap integral
• 100g de frango desfiado
• Cream cheese light
• Rúcula e tomate
📊 ~35g proteína

**Dica:** Prepare na noite anterior para ganhar tempo pela manhã!`,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=400&fit=crop",
        category: "Receitas",
        readTime: "5 min",
        author: "GymPlanner",
        date: "09 Dez 2024"
    },
    {
        id: "d3",
        title: "Guia de Suplementação para Iniciantes",
        description: "Conheça os suplementos mais importantes: whey protein, creatina, BCAA e quando utilizá-los.",
        content: `Suplementos podem ajudar, mas não fazem milagres:

**1. WHEY PROTEIN** ⭐⭐⭐⭐⭐
• O que é: Proteína do soro do leite
• Para quem: Todos que treinam
• Quando: Pós-treino ou entre refeições
• Dose: 20-40g por porção
• Benefícios: Rápida absorção, prático, alto valor biológico

**2. CREATINA** ⭐⭐⭐⭐⭐
• O que é: Aminoácido produzido naturalmente pelo corpo
• Para quem: Quem busca força e hipertrofia
• Quando: Qualquer horário (consistência é o que importa)
• Dose: 3-5g por dia
• Benefícios: Aumenta força, potência e volume muscular

**3. CAFEÍNA** ⭐⭐⭐⭐
• O que é: Estimulante natural
• Para quem: Quem treina intenso
• Quando: 30-60 min antes do treino
• Dose: 3-6mg por kg de peso
• Benefícios: Energia, foco, performance

**4. ÔMEGA 3** ⭐⭐⭐⭐
• O que é: Ácidos graxos essenciais
• Para quem: Todos
• Quando: Junto às refeições
• Dose: 1-3g de EPA+DHA por dia
• Benefícios: Anti-inflamatório, saúde cardiovascular

**5. VITAMINA D** ⭐⭐⭐⭐
• O que é: Vitamina lipossolúvel
• Para quem: Maioria das pessoas (deficiência comum)
• Quando: Pela manhã
• Dose: 1000-4000 UI/dia
• Benefícios: Imunidade, ossos, hormônios

**Ordem de Prioridade:**
1º Creatina (custo-benefício imbatível)
2º Whey (praticidade)
3º Cafeína (pré-treino)
4º Ômega 3 e Vitamina D (saúde geral)`,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=400&fit=crop",
        category: "Suplementos",
        readTime: "6 min",
        author: "GymPlanner",
        date: "07 Dez 2024"
    },
    {
        id: "d4",
        title: "Dieta Low Carb: Prós e Contras",
        description: "Entenda como funciona a dieta com baixo carboidrato e se ela é adequada para seus objetivos.",
        content: `Low Carb é uma estratégia alimentar com restrição de carboidratos:

**O que é Low Carb?**
Dieta com menos de 130g de carboidratos por dia (ou menos de 26% das calorias totais).

**Tipos de Low Carb:**
• Moderada: 100-130g carbs/dia
• Liberal: 50-100g carbs/dia  
• Cetogênica: menos de 50g carbs/dia

**✅ PRÓS:**
• Perda de peso rápida inicial
• Redução da fome (maior saciedade)
• Melhora sensibilidade à insulina
• Pode ajudar diabéticos tipo 2
• Redução de triglicerídeos
• Menos inchaço e retenção

**❌ CONTRAS:**
• Difícil manter a longo prazo
• Pode prejudicar treinos intensos
• Possível deficiência de fibras
• "Gripe low carb" nos primeiros dias
• Restrição social em eventos
• Não é ideal para atletas de alta performance

**Para quem É indicada:**
✓ Sedentários ou atividade leve
✓ Pessoas com resistência à insulina
✓ Quem busca emagrecimento rápido

**Para quem NÃO é indicada:**
✗ Praticantes de musculação intensa
✗ Atletas de endurance
✗ Gestantes e lactantes
✗ Pessoas com distúrbios alimentares

**Conclusão:**
Low carb pode ser uma ferramenta útil, mas não é superior a outras dietas para perda de peso. O déficit calórico é o que importa!`,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
        category: "Emagrecimento",
        readTime: "7 min",
        author: "GymPlanner",
        date: "04 Dez 2024"
    },
    {
        id: "d5",
        title: "Refeições Pré e Pós-Treino Ideais",
        description: "O que comer antes e depois do treino para maximizar performance e recuperação muscular.",
        content: `A nutrição ao redor do treino pode otimizar seus resultados:

**🍽️ PRÉ-TREINO (1-3 horas antes)**

**Objetivo:** Energia para o treino

**Composição ideal:**
• Carboidratos complexos: Dar energia sustentada
• Proteína moderada: Prevenir catabolismo
• Gordura baixa: Digestão mais rápida

**Exemplos de refeições:**
• Arroz + frango + legumes (2-3h antes)
• Pão integral + peito de peru + banana (1-2h antes)
• Vitamina de banana com whey (1h antes)
• Barra de cereal + iogurte (45min antes)

**Evite:** Muita gordura, fibras em excesso, alimentos novos

---

**🍽️ PÓS-TREINO (até 2 horas depois)**

**Objetivo:** Recuperação e síntese proteica

**Composição ideal:**
• Proteína de rápida absorção: Reconstruir músculos
• Carboidratos: Repor glicogênio
• Baixa gordura: Não atrasar absorção

**Exemplos de refeições:**
• Whey + banana + mel (imediato)
• Frango + arroz branco + vegetais (1h depois)
• Omelete + pão branco + suco (1h depois)
• Iogurte grego + granola + frutas

**Janela Anabólica:**
O mito da "janela de 30 minutos" foi desmentido. O importante é consumir proteína suficiente ao longo do dia!

**Dica Extra:**
Se treinar em jejum, o pós-treino se torna ainda mais importante para interromper o catabolismo.`,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=400&fit=crop",
        category: "Nutrição",
        readTime: "5 min",
        author: "GymPlanner",
        date: "02 Dez 2024"
    },
    {
        id: "d6",
        title: "Meal Prep: Organize sua Semana",
        description: "Dicas práticas para preparar suas refeições da semana e manter a dieta em dia mesmo com a rotina corrida.",
        content: `Meal Prep é a arte de preparar refeições com antecedência:

**Por que fazer Meal Prep?**
✓ Economiza tempo durante a semana
✓ Evita escolhas alimentares ruins
✓ Controle preciso de calorias e macros
✓ Economia de dinheiro
✓ Menos estresse com alimentação

**Passo a Passo:**

**1. PLANEJE (Sexta/Sábado)**
• Defina o cardápio da semana
• Faça lista de compras
• Calcule quantidades necessárias

**2. COMPRE (Sábado)**
• Proteínas: frango, carne, peixe, ovos
• Carboidratos: arroz, batata, macarrão
• Vegetais: brócolis, abobrinha, cenoura
• Temperos: alho, cebola, ervas

**3. PREPARE (Domingo - 2-3 horas)**
• Cozinhe arroz e batatas
• Grelhe as proteínas
• Asse os vegetais
• Tempere e porcione

**4. ARMAZENE**
• Use potes herméticos de vidro
• Etiquete com data
• Congele o que for para depois de 3 dias

**Receitas que duram bem:**
• Frango grelhado ou desfiado
• Carne moída refogada
• Arroz integral
• Legumes assados
• Feijão e lentilha

**O que NÃO preparar com antecedência:**
• Saladas de folhas (murcham)
• Ovos cozidos (mais de 5 dias)
• Alimentos fritos (ficam moles)

**Kit essencial:**
📦 10-14 potes de vidro
🏷️ Etiquetas
⚖️ Balança de cozinha
📱 App de contagem de calorias`,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop",
        category: "Organização",
        readTime: "6 min",
        author: "GymPlanner",
        date: "29 Nov 2024"
    }
];

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
