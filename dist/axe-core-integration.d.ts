import type { Disposable } from "./types.js";
export interface AxeRunConfig {
    rules?: string[];
    exclude?: string[];
    context?: Element;
}
export interface AxeViolation {
    id: string;
    impact: "minor" | "moderate" | "serious" | "critical";
    description: string;
    helpUrl: string;
    nodes: Array<{
        element: Element;
        failureSummary: string;
    }>;
}
export interface AxeIntegrationConfig {
    rootElement: Element;
}
export interface AxeIntegrationAPI extends Disposable {
    run(config?: AxeRunConfig): Promise<AxeViolation[]>;
    runOnNode(element: Element): Promise<AxeViolation[]>;
    isAvailable(): boolean;
}
export declare function createAxeIntegration(config: AxeIntegrationConfig): AxeIntegrationAPI;
//# sourceMappingURL=axe-core-integration.d.ts.map