import { Property } from "./prop";
import { Vue } from 'vue-property-decorator';
import { EventBus } from 'src/service/eventBus';

export abstract class Entity extends Vue {
    id: string = '';
    name: string = '';
    type: EntityType;

    isLoading: boolean = false;
    isEdit: boolean = false;
    isReady: boolean = false;

    config: EntityConfig;
   
    constructor(type: EntityType) {
        super();
        this.type = type;
    }


    loadConfig(config: EntityConfig) {
        this.isReady = false;
        this.isLoading = true;

        setTimeout(() => {
            if (config !== undefined) {
                this.config = config;
                this.id = config.id;
                this.name = config.name;

                if (config.props !== undefined) {
                    let cfgVals = config.props;
                    this.getProps().forEach(p => {
                        if (p.name in cfgVals) {
                            p.value = cfgVals[p.name];
                        }
                    });
                }
                EventBus.$emit('entity-loaded', this);
                this.isReady = true;
                this.afterLoadConfig();
            }
            this.isLoading = false;

        }, 200);
    }

    getProps(): Map<string, Property<any>> {
        let props = new Map<string, Property<any>>();
        for (let key in this) {
            let p = this[key] as any;
            let pn = p && p.name;
            
            /**
             * note: use "prop.name" instead of "key"
             */
            if (p instanceof Property && !props.has(pn)) {
                props.set(pn, p);
            }
        }
        return props;
    }

    abstract afterLoadConfig(): void;
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


