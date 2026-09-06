export function createScreenReaderBridge(config) {
    let optimizationMode = false;
    const lrm = config.liveRegionManager;
    const politeRegion = lrm.createRegion("__sr-polite__", { level: "polite" });
    const assertiveRegion = lrm.createRegion("__sr-assertive__", { level: "assertive" });
    const routeRegion = lrm.createRegion("__sr-route__", { level: "assertive" });
    function detect() {
        const signals = [];
        if (typeof window !== "undefined" && window.matchMedia) {
            if (window.matchMedia("(forced-colors: active)").matches) {
                signals.push("forced-colors-active");
            }
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                signals.push("prefers-reduced-motion");
            }
            if (window.matchMedia("(prefers-contrast: more)").matches) {
                signals.push("prefers-contrast-more");
            }
        }
        if (typeof document !== "undefined") {
            if (document.querySelector("[data-nvda]")) {
                signals.push("nvda-indicator");
            }
            if (document.querySelector('[role="application"]')) {
                signals.push("application-role-present");
            }
        }
        const confidence = signals.length >= 3 ? "high" :
            signals.length >= 2 ? "medium" :
                signals.length >= 1 ? "low" :
                    "none";
        return {
            likely: signals.length >= 2,
            confidence,
            signals,
        };
    }
    return {
        detect,
        announcePolite(message) {
            politeRegion.announce(message);
        },
        announceAssertive(message) {
            assertiveRegion.announce(message);
        },
        announceRouteChange(routeName) {
            routeRegion.announce(`Navigated to ${routeName}`);
        },
        setOptimizationMode(enabled) {
            optimizationMode = enabled;
        },
        isOptimizationMode() {
            return optimizationMode;
        },
        destroy() {
            lrm.destroyRegion("__sr-polite__");
            lrm.destroyRegion("__sr-assertive__");
            lrm.destroyRegion("__sr-route__");
        },
    };
}
//# sourceMappingURL=screen-reader-bridge.js.map