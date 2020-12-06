


import { Prop } from "vue-property-decorator";
import { Entity, EntityConfig, EntityType } from './entity';
import * as def from "src/model";
import * as prop from './prop';


export abstract class Widget extends Entity {

    
    @Prop({ type: Object as () => def.WidgetConfig })
    widgetConfig!: def.WidgetConfig;

    title: prop.PString = new prop.PString('Title', "hellow");
    showHeader: prop.PBoolean = new prop.PBoolean('Show Header', true);
    

    constructor() {
        super(EntityType.Widget);
    }

    afterLoadConfig(){
    }
}


export interface WidgetConfig extends EntityConfig {
    x: number;
    y: number;
    sizex: number;
    sizey: number;
    widgetName: string;
}