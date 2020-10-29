

export enum PropType {
    Boolean = 'Boolean',
    String = 'String',
    Selection = 'Selection',
    Object = 'Object'
}

export class Property<T> {
    name: string;
    type: PropType;
    value: T | undefined;

    constructor(name: string, type: PropType, value?: T) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}


export class PBoolean extends Property<boolean> {
    constructor(name: string, defaultValue: boolean = false) {
        super(name, PropType.Boolean, defaultValue);
    }
}

export class PString extends Property<string> {
    constructor(name: string, defaultValue: string = '') {
        super(name, PropType.String, defaultValue);
    }
}

export class PSelection extends Property<string> {
    options: string[] = [];
    constructor(name: string, defaultValue: string = '') {
        super(name, PropType.Selection, defaultValue);
    }
}

export class PObject extends Property<object> {
    constructor(name: string, defaultValue: object = {}) {
        super(name, PropType.Object, defaultValue);
    }
}


export interface PEventValue {
    pooling: number;
}

export class PEvent extends Property<object> {
    constructor(name: string, defaultValue: object = {}) {
        super(name, PropType.Object, defaultValue);
    }
}