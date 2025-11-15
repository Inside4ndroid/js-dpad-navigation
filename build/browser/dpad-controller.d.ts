import { FocusableItem } from './_focusable-item';
export declare class DpadController {
    private focusableItems;
    private currentlyFocusedItem;
    private enabled;
    constructor();
    disable(): void;
    enable(): void;
    findFocusableItems(): void;
    addFocusableItem(i: FocusableItem): void;
    getFocusableItems(): Array<FocusableItem>;
    getFocusableItem(index: number): FocusableItem;
    setCurrentFocusItem(i: number): void;
    update(): void;
    moveFocus(direction: Point): void;
    private updateNeighbors;
    private verticalDistance;
    private getTopDistance;
    private getBottomDistance;
    private horizontalDistance;
    private getLeftDistance;
    private getRightDistance;
    private onKeyDown;
    private onKeyUp;
}
interface Point {
    x: number;
    y: number;
}
export {};
//# sourceMappingURL=dpad-controller.d.ts.map