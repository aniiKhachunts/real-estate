// src/data/aiTools.ts

export type AiCategory =
    | "content"
    | "marketing"
    | "developer"
    | "design"
    | "video"
    | "audio"
    | "productivity"
    | "automation"
    | "other";

export type PricingModel = "free" | "freemium" | "paid" | "enterprise";

export interface AiTool {
    id: string;
    name: string;
    shortDescription: string;
    url: string;
    category: AiCategory;
    tags: string[];
    pricing: PricingModel;
    featured?: boolean;
    logoUrl?: string;
}

export const aiToolsMock: AiTool[] = [
    {
        id: "1",
        name: "PromptFlow",
        shortDescription: "No-code workflows to connect multiple AI tools for marketing and growth.",
        url: "https://example.com",
        category: "marketing",
        tags: ["automation", "workflows", "campaigns"],
        pricing: "freemium",
        featured: true,
    },
    {
        id: "2",
        name: "CodePilot AI",
        shortDescription: "AI assistant for developers with code suggestions and refactors.",
        url: "https://example.com",
        category: "developer",
        tags: ["coding", "assistant", "IDE"],
        pricing: "free",
        featured: true,
    },
    {
        id: "3",
        name: "StoryVision",
        shortDescription: "Turn scripts into AI-generated videos with voice and b-roll.",
        url: "https://example.com",
        category: "video",
        tags: ["video", "creators"],
        pricing: "paid",
    },
];
