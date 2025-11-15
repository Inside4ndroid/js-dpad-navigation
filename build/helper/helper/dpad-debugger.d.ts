import { DpadController } from '../lib/dpad-controller';
import { DebugController } from '../lib/debug-controller';
declare global {
    interface Window {
        dpad: DpadController | null;
        dpaddebug: DebugController;
    }
}
//# sourceMappingURL=dpad-debugger.d.ts.map