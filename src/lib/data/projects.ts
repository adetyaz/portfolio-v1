export interface Project {
    bgcolor: string;
    id: number;
    title: string;
    slug: string;
    image: string;
    year: string;
    category: string;
    client?: string;
    liveUrl?: string;
    date?: string;
    services?: string[];
    description?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Neutral",
        slug: "neutral",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
        year: "2025",
        category: "Website Design",
        client: "Commercial",
        liveUrl: "www.studio.inc",
        date: "February 2025",
        services: ["Design", "No-Code", "Dedicated Panel"],
        description: "Minimalist table with blog posts with implementation to dedicated CMS — All matched with animations and responsive. Editorial style for a modern approach."
    },
    {
        id: 2,
        title: "Kinsight",
        slug: "kinsight",
        image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=600&auto=format&fit=crop",
        year: "2023",
        category: "Brand Identity",
        client: "Kinsight",
        liveUrl: "www.kinsight.io",
        date: "March 2023",
        services: ["Branding", "Strategy"],
        description: "A comprehensive brand identity system for a fintech startup focusing on transparency and insight."
    },
    {
        id: 3,
        title: "Lamu",
        slug: "lamu",
        image: "https://images.unsplash.com/photo-1589365278144-c6e7d3316b0c?q=80&w=600&auto=format&fit=crop",
        year: "2023",
        category: "Web Design",
        client: "Lamu",
        services: ["Web Design", "Development"],
        date: "January 2023",
        description: "E-commerce platform for sustainable fashion, emphasizing clean lines and ethical production transparency."
    },
    {
        id: 4,
        title: "C.C.Zero",
        slug: "cc-zero",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
        year: "2023",
        category: "Art Direction",
        client: "C.C.Zero",
        services: ["Art Direction", "Photography"],
        date: "June 2023",
        description: "Visual campaign for a zero-carbon initiative, utilizing striking imagery to convey urgency and hope."
    },
    {
        id: 5,
        title: "Raw",
        slug: "raw",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
        year: "2023",
        category: "Photography",
        client: "Raw Materials",
        services: ["Photography", "Set Design"],
        date: "September 2023",
        description: "Texture-focused photography series exploring the raw beauty of natural materials in architectural contexts."
    }
];
