import { Point } from "./_point";
export declare class FocusableItem {
    private element;
    private focusState;
    private neighbors;
    constructor(ele: HTMLElement);
    getElement(): HTMLElement;
    focus(): void;
    resetNeighbors(): void;
    setTopFocusItemIndex(index: number): void;
    getTopFocusItemIndex(): number;
    setBottomFocusItemIndex(index: number): void;
    getBottomFocusItemIndex(): number;
    setLeftFocusItemIndex(index: number): void;
    getLeftFocusItemIndex(): number;
    setRightFocusItemIndex(index: number): void;
    getRightFocusItemIndex(): number;
    isFocusable(): boolean;
    getMetrics(): Metrics;
    onItemClickStateChange(isDown: boolean): void;
}
export interface Neighbors {
    top: number | null;
    bottom: number | null;
    left: number | null;
    right: number | null;
}
export interface Metrics {
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    center: Point;
}
//# sourceMappingURL=_focusable-item.d.ts.map