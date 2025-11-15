"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusableItem = void 0;
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
exports.FocusableItem = FocusableItem;
//# sourceMappingURL=_focusable-item.js.map