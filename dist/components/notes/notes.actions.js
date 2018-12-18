"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namespace = 'Notes';
exports.ADDED_NOTE = `[${namespace}] Added note`;
exports.UPDATED_NOTE = `[${namespace}] Updated note`;
exports.REMOVED_NOTE = `[${namespace}] Removed note`;
class AddedNote {
    constructor(data) {
        this.data = data;
        this.event = exports.ADDED_NOTE;
    }
}
exports.AddedNote = AddedNote;
class UpdatedNote {
    constructor(data) {
        this.data = data;
        this.event = exports.UPDATED_NOTE;
    }
}
exports.UpdatedNote = UpdatedNote;
class RemovedNote {
    constructor(data) {
        this.data = data;
        this.event = exports.REMOVED_NOTE;
    }
}
exports.RemovedNote = RemovedNote;
//# sourceMappingURL=notes.actions.js.map