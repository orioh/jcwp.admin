import { Property } from "./prop";
import { Vue } from 'vue-property-decorator';

export class Entity extends Vue {
    id: string = '';
    name: string = '';
    type: EntityType;

    isLoading: boolean = false;
    isEdit: boolean = false;
    isReady: boolean = false;

    protected _props: Map<string, Property<any>>;
    get props(): Map<string, Property<any>> {
        if (this._props) { return this._props; }

        this._props = new Map<string, Property<any>>();
        for (let key in this) {
            let p = this[key] as any;
            let pn = p && p.name;
            /**
             * note: use "prop.name" instead of "key"
             */
            if (p instanceof Property && !this._props.has(pn)) {
                this._props.set(pn, p);
            }
        }
        return this._props;
    }

    constructor(type: EntityType) {
        super();
        this.type = type;
    }


    initConfig(config: EntityConfig) {
        this.isReady = false;
        if (config !== undefined) {
            this.id = config.id;
            this.name = config.name;

            if (config.props !== undefined) {
                let cfgVals = config.props;
                this.props.forEach(p => {
                    if (p.name in cfgVals) {
                        p.value = cfgVals[p.name];
                    }
                });
            }

            this.isReady = true;
        }

    }
}

export enum EntityType {
    Frame = 'Frame',
    Widget = 'Widget',
}

export interface EntityConfig {
    id: string;
    name: string,
    props?: { [key: string]: any };
}


