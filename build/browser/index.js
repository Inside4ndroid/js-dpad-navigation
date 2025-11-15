this.gauntface = this.gauntface || {};
this.gauntface.dpad = (function (exports) {
    'use strict';

    // Copyright 2013 Google Inc. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.
    class FocusableItem {
        constructor(ele) {
            this.focusState = false;
            this.element = ele;
            this.resetNeighbors();
        }
        getElement() {
            return this.element;
        }
        focus() {
            this.element.focus();
        }
        resetNeighbors() {
            this.neighbors = {
                top: null,
                bottom: null,
                left: null,
                right: null,
            };
        }
        ;
        setTopFocusItemIndex(index) {
            this.neighbors.top = index;
        }
        ;
        getTopFocusItemIndex() {
            return this.neighbors.top;
        }
        ;
        setBottomFocusItemIndex(index) {
            this.neighbors.bottom = index;
        }
        ;
        getBottomFocusItemIndex() {
            return this.neighbors.bottom;
        }
        ;
        setLeftFocusItemIndex(index) {
            this.neighbors.left = index;
        }
        ;
        getLeftFocusItemIndex() {
            return this.neighbors.left;
        }
        ;
        setRightFocusItemIndex(index) {
            this.neighbors.right = index;
        }
        ;
        getRightFocusItemIndex() {
            return this.neighbors.right;
        }
        ;
        isFocusable() {
            if (this.element.style.display === 'none' || this.element.style.visibility === 'hidden') {
                return false;
            }
            let tabIndexAttr = this.element.getAttribute('tabindex');
            if (!tabIndexAttr) {
                return false;
            }
            try {
                const tabIndex = parseInt(tabIndexAttr, 10);
                return tabIndex > -1;
            }
            catch (err) {
                // NOOP
            }
            return false;
        }
        getMetrics() {
            var clientRect = this.element.getBoundingClientRect();
            return {
                width: clientRect.width,
                height: clientRect.height,
                left: clientRect.left,
                right: clientRect.left + clientRect.width,
                top: clientRect.top,
                bottom: clientRect.top + clientRect.height,
                center: {
                    x: clientRect.left + (clientRect.width / 2),
                    y: clientRect.top + (clientRect.height / 2)
                }
            };
        }
        onItemClickStateChange(isDown) {
            // NOOP
        }
    }

    function calcDistance(x, y) {
        return Math.floor(Math.sqrt((x * x) + (y * y)));
    }

    // Copyright 2013 Google Inc. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.
    const FOCUSABLE_ITEM_SELECTOR = '.dpad-focusable';
    class DpadController {
        constructor() {
            this.focusableItems = [];
            this.currentlyFocusedItem = null;
            this.enabled = false;
            this.focusableItems = [];
            this.onKeyDown = this.onKeyDown.bind(this);
            this.onKeyUp = this.onKeyUp.bind(this);
            this.enable();
        }
        disable() {
            if (!this.enabled) {
                return;
            }
            document.removeEventListener('keydown', this.onKeyDown);
            document.removeEventListener('keyup', this.onKeyUp);
            this.enabled = false;
        }
        enable() {
            if (this.enabled) {
                return;
            }
            // Set up binding to listen for key presses
            document.addEventListener('keydown', this.onKeyDown);
            document.addEventListener('keyup', this.onKeyUp);
            this.enabled = true;
        }
        findFocusableItems() {
            const focusableItems = document.querySelectorAll(FOCUSABLE_ITEM_SELECTOR);
            Array.from(focusableItems).forEach(fi => {
                this.addFocusableItem(new FocusableItem(fi));
            });
        }
        addFocusableItem(i) {
            this.focusableItems.push(i);
        }
        getFocusableItems() {
            return this.focusableItems;
        }
        getFocusableItem(index) {
            if (index >= this.focusableItems.length || index < 0) {
                return null;
            }
            return this.focusableItems[index];
        }
        setCurrentFocusItem(i) {
            const fi = this.getFocusableItem(i);
            this.currentlyFocusedItem = fi;
            if (!this.currentlyFocusedItem) {
                return;
            }
            this.currentlyFocusedItem.focus();
        }
        update() {
            // Reset focusable items array so it doesn't have duplicates
            // added to it with every update call
            this.focusableItems = [];
            this.findFocusableItems();
            // Need to reset currently focused item so that we can replace it
            // with the new FocusableItem in the focusableItems array
            const previouslyFocusedItem = this.currentlyFocusedItem;
            this.currentlyFocusedItem = null;
            for (const fi of this.focusableItems) {
                // If the element can't be focused, skip it.
                if (!fi.isFocusable()) {
                    continue;
                }
                // Check if the element that was the focused item still exists
                // and set it as the currentlyFocusedItem if so
                if (previouslyFocusedItem && fi.getElement() == previouslyFocusedItem.getElement()) {
                    this.currentlyFocusedItem = fi;
                }
                this.updateNeighbors(fi);
            }
        }
        moveFocus(direction) {
            // We need an item to move down from
            if (!this.currentlyFocusedItem) {
                if (this.focusableItems.length > 0) {
                    this.setCurrentFocusItem(0);
                }
                return;
            }
            var nextItemIndex = null;
            if (direction.y === 0) {
                if (direction.x > 0) {
                    // Move Right
                    nextItemIndex = this.currentlyFocusedItem.getRightFocusItemIndex();
                }
                else {
                    // Move Left
                    nextItemIndex = this.currentlyFocusedItem.getLeftFocusItemIndex();
                }
            }
            else if (direction.x === 0) {
                if (direction.y > 0) {
                    // Move Up
                    nextItemIndex = this.currentlyFocusedItem.getTopFocusItemIndex();
                }
                else {
                    // Move Down
                    nextItemIndex = this.currentlyFocusedItem.getBottomFocusItemIndex();
                }
            }
            if (nextItemIndex !== null) {
                this.setCurrentFocusItem(nextItemIndex);
            }
        }
        updateNeighbors(fi) {
            const metrics = fi.getMetrics();
            const itemCount = this.focusableItems.length;
            let minTopElementDist;
            let minBottomElementDist;
            let minLeftElementDist;
            let minRightElementDist;
            for (var i = 0; i < itemCount; i++) {
                var newItem = this.getFocusableItem(i);
                // If the element can't be focused, or is the current element,
                // skip it.
                if (!newItem.isFocusable() || newItem === fi) {
                    continue;
                }
                const newItemMetrics = newItem.getMetrics();
                const distanceTop = this.getTopDistance(metrics, newItemMetrics);
                const distanceBottom = this.getBottomDistance(metrics, newItemMetrics);
                const distanceLeft = this.getLeftDistance(metrics, newItemMetrics);
                const distanceRight = this.getRightDistance(metrics, newItemMetrics);
                if (distanceTop !== null && (typeof minTopElementDist === 'undefined' || minTopElementDist > distanceTop)) {
                    minTopElementDist = distanceTop;
                    fi.setTopFocusItemIndex(i);
                }
                if (distanceBottom !== null && (typeof minBottomElementDist === 'undefined' || minBottomElementDist > distanceBottom)) {
                    minBottomElementDist = distanceBottom;
                    fi.setBottomFocusItemIndex(i);
                }
                if (distanceLeft !== null && (typeof minLeftElementDist === 'undefined' || minLeftElementDist > distanceLeft)) {
                    minLeftElementDist = distanceLeft;
                    fi.setLeftFocusItemIndex(i);
                }
                if (distanceRight !== null && (typeof minRightElementDist === 'undefined' || minRightElementDist > distanceRight)) {
                    minRightElementDist = distanceRight;
                    fi.setRightFocusItemIndex(i);
                }
            }
        }
        verticalDistance(fromMetrics, toMetrics, higher, lower) {
            if (higher.bottom > lower.top) {
                return null;
            }
            const left = Math.abs(fromMetrics.center.x - toMetrics.left);
            const right = Math.abs(fromMetrics.center.x - toMetrics.right);
            const x = Math.min(Math.abs(fromMetrics.center.x - toMetrics.left), Math.abs(fromMetrics.center.x - toMetrics.center.x), Math.abs(fromMetrics.center.x - toMetrics.right));
            const y = lower.center.y - higher.center.y;
            const angleLeft = Math.atan(y / left) * (180 / Math.PI);
            const angleRight = Math.atan(y / right) * (180 / Math.PI);
            // If the angle is too shallow it's not really up
            if (!(angleLeft >= 0 && angleRight <= 180)) {
                return null;
            }
            return calcDistance(x, y);
        }
        getTopDistance(fromMetrics, toMetrics) {
            // Move Up
            return this.verticalDistance(fromMetrics, toMetrics, toMetrics, fromMetrics);
        }
        getBottomDistance(fromMetrics, toMetrics) {
            // Move Down
            return this.verticalDistance(fromMetrics, toMetrics, fromMetrics, toMetrics);
        }
        horizontalDistance(fromMetrics, toMetrics, lefter, righter) {
            if (lefter.right > righter.left) {
                return null;
            }
            const top = Math.abs(fromMetrics.center.y - toMetrics.top);
            const bottom = Math.abs(fromMetrics.center.y - toMetrics.bottom);
            const x = righter.center.x - lefter.center.x;
            const y = Math.min(Math.abs(fromMetrics.center.y - toMetrics.top), Math.abs(fromMetrics.center.y - toMetrics.center.y), Math.abs(fromMetrics.center.y - toMetrics.bottom));
            var angleTop = Math.atan(x / top) * (180 / Math.PI);
            var angleBottom = Math.atan(x / bottom) * (180 / Math.PI);
            // If the angle is too shallow it's not really up
            if (!(angleTop >= 0 && angleBottom <= 180)) {
                return null;
            }
            return calcDistance(x, y);
        }
        getLeftDistance(fromMetrics, toMetrics) {
            // Move Left
            return this.horizontalDistance(fromMetrics, toMetrics, toMetrics, fromMetrics);
        }
        getRightDistance(fromMetrics, toMetrics) {
            // Move Right
            return this.horizontalDistance(fromMetrics, toMetrics, fromMetrics, toMetrics);
        }
        onKeyDown(event) {
            switch (event.keyCode) {
                case 9:
                    // Tab
                    break;
                case 37:
                    // Left
                    event.preventDefault();
                    this.moveFocus({ x: -1, y: 0 });
                    break;
                case 38:
                    // Up
                    event.preventDefault();
                    this.moveFocus({ x: 0, y: 1 });
                    break;
                case 39:
                    // Right
                    event.preventDefault();
                    this.moveFocus({ x: 1, y: 0 });
                    break;
                case 40:
                    // Down
                    event.preventDefault();
                    this.moveFocus({ x: 0, y: -1 });
                    break;
                case 13:
                case 32:
                    // Enter
                    event.preventDefault();
                    if (this.currentlyFocusedItem) {
                        this.currentlyFocusedItem.onItemClickStateChange(true);
                    }
                    break;
            }
        }
        onKeyUp(event) {
            switch (event.keyCode) {
                case 13:
                    // Enter
                    event.preventDefault();
                    if (this.currentlyFocusedItem) {
                        this.currentlyFocusedItem.onItemClickStateChange(false);
                    }
                    break;
            }
        }
    }

    const DBEUG_LINE_CLASSNAME = 'dpad-debugger-line';
    const DEBUG_LINE_SELECTOR = `.${DBEUG_LINE_CLASSNAME}`;
    const MARKER_COLORS = [
        '#1abc9c',
        '#2ecc71',
        '#3498db',
        '#9b59b6',
        '#34495e',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#ecf0f1',
        '#95a5a6'
    ];
    class DebugController {
        constructor(dpad) {
            if (!dpad) {
                console.error(`Unable to debug since the dpad controller is not defined.`);
            }
            this.dpad = dpad;
            this.debugMode = false;
        }
        setDebugMode(d) {
            this.debugMode = d;
            this.updateDisplay();
        }
        toggleDebugMode() {
            this.debugMode = !this.debugMode;
            this.updateDisplay();
        }
        updateDisplay() {
            this.clearDisplay();
            if (!this.debugMode) {
                return;
            }
            const items = this.dpad.getFocusableItems();
            for (let i = 0; i < items.length; i++) {
                const fi = items[i];
                // If the element can't be focused, skip it.
                if (!fi.isFocusable()) {
                    continue;
                }
                this.printDebugLinesForItem(i, fi);
            }
        }
        clearDisplay() {
            const debugLines = document.querySelectorAll(DEBUG_LINE_SELECTOR);
            Array.from(debugLines).forEach(dl => {
                dl.remove();
            });
        }
        printDebugLinesForItem(index, focusableItem) {
            const markerIndex = index % MARKER_COLORS.length;
            const markerColor = MARKER_COLORS[markerIndex];
            const currentItemMetrics = focusableItem.getMetrics();
            const topIndex = focusableItem.getTopFocusItemIndex();
            if (topIndex !== null) {
                const topMetrics = this.dpad.getFocusableItem(topIndex).getMetrics();
                const xDist = topMetrics.center.x - currentItemMetrics.center.x;
                const yDist = currentItemMetrics.top - topMetrics.center.y;
                const angle = ((Math.atan2(xDist, yDist) * 180) / Math.PI) + 180;
                this.printDebugLine(calcDistance(xDist, yDist), (currentItemMetrics.center.x - 5), currentItemMetrics.top, markerColor, angle);
            }
            const bottomIndex = focusableItem.getBottomFocusItemIndex();
            if (bottomIndex !== null) {
                const bottomMetrics = this.dpad.getFocusableItem(bottomIndex).getMetrics();
                const xDist = currentItemMetrics.center.x - bottomMetrics.center.x;
                const yDist = bottomMetrics.center.y - currentItemMetrics.bottom;
                const angle = ((Math.atan2(xDist, yDist) * 180) / Math.PI) + 360;
                this.printDebugLine(calcDistance(xDist, yDist), (currentItemMetrics.center.x + 5), currentItemMetrics.bottom, markerColor, angle);
            }
            const leftIndex = focusableItem.getLeftFocusItemIndex();
            if (leftIndex !== null) {
                const leftMetrics = this.dpad.getFocusableItem(leftIndex).getMetrics();
                const xDist = leftMetrics.center.x - currentItemMetrics.left;
                const yDist = currentItemMetrics.center.y - leftMetrics.center.y;
                const angle = ((Math.atan2(xDist, yDist) * 180) / Math.PI) + 180;
                this.printDebugLine(calcDistance(xDist, yDist), currentItemMetrics.left, currentItemMetrics.center.y + 5, markerColor, angle);
            }
            const rightIndex = focusableItem.getRightFocusItemIndex();
            if (rightIndex !== null) {
                const rightMetrics = this.dpad.getFocusableItem(rightIndex).getMetrics();
                const xDist = rightMetrics.center.x - currentItemMetrics.right;
                const yDist = currentItemMetrics.center.y - rightMetrics.center.y;
                const angle = ((Math.atan2(xDist, yDist) * 180) / Math.PI) + 180;
                this.printDebugLine(calcDistance(xDist, yDist), currentItemMetrics.right, currentItemMetrics.center.y - 5, markerColor, angle);
            }
        }
        printDebugLine(length, startX, startY, color, angle) {
            const lineElement = document.createElement('div');
            lineElement.classList.add(DBEUG_LINE_CLASSNAME);
            lineElement.classList.add('marker');
            lineElement.classList.add('start');
            lineElement.style.position = 'absolute';
            lineElement.style.width = 5 + 'px';
            lineElement.style.height = length + 'px';
            lineElement.style.left = startX + 'px';
            lineElement.style.top = startY + 'px';
            lineElement.style.backgroundColor = color;
            lineElement.style.transform = 'rotate(' + angle + 'deg)';
            lineElement.style.transformOrigin = '0% 0%';
            document.body.appendChild(lineElement);
        }
    }

    exports.DebugController = DebugController;
    exports.DpadController = DpadController;

    return exports;

})({});
//# sourceMappingURL=index.js.map
