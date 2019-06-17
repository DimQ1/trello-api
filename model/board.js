module.exports = class Board {
    constructor(id, name, color, description) {
        this._id = id;
        this._name = name;
        this._color = color;
        this._description = description;
        this._created = new Date();
    }

    get id() {
        return this._id;
    }

    set id(newId) {
        this._id = newId;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;
    }

    get description() {
        return this._description;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    get created() {
        return this._created;
    }

    set created(newCreatedDate) {
        this._created = newCreatedDate;
    }
};
