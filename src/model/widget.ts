


import { Prop } from "vue-property-decorator";
import { Entity, EntityConfig, EntityType } from './entity';
import * as def from "src/model";
import * as prop from './prop';


export class Widget extends Entity {

    
    @Prop({ type: Object as () => def.WidgetConfig })
    widgetConfig!: def.WidgetConfig;

    title: prop.PString = new prop.PString('Title');
    showHeader: prop.PBoolean = new prop.PBoolean('Show Header');
    

    constructor() {
        super(EntityType.Widget);
    }
}


export interface WidgetConfig extends EntityConfig {
    widgetName: string;
}