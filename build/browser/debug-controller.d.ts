import { DpadController } from './dpad-controller';
export declare class DebugController {
    private dpad;
    private debugMode;
    constructor(dpad: DpadController | null);
    setDebugMode(d: boolean): void;
    toggleDebugMode(): void;
    updateDisplay(): void;
    private clearDisplay;
    private printDebugLinesForItem;
    private printDebugLine;
}
//# sourceMappingURL=debug-controller.d.ts.map