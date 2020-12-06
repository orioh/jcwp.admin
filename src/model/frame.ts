import { Entity, EntityConfig, EntityType } from './entity';
import { EventBus } from 'src/service/eventBus';
import { Widget, WidgetConfig } from './widget';
import { MsgService } from 'src/service/msgService';

export abstract class Frame extends Entity {

    widgetMap: Map<string, Entity>;

    constructor() {
        super(EntityType.Frame);
        
    }

    init(config: EntityConfig){
        this.widgetMap = new Map<string, Entity>();
        console.log('frame init')
        EventBus.$off('entity-loaded');
        EventBus.$on('entity-loaded', (e: any) => { this.onEntityLoaded(e) });
        this.loadConfig(config);
    }

    onEntityLoaded(entity: Entity) {
        if (entity !== undefined) {
            let id = entity.id;
            let name = entity.name;
            MsgService.info(`frame, get entity loaded, ${id}, ${name}`);
            if (this.widgetMap.has(id)) {
                MsgService.error(`frame, duplicated widget loaded`);
            } else {
                this.widgetMap.set(id, entity);
            }
        }
    }


    removeWidget(widget: WidgetConfig) {
        if (this.isReady && this.config) {
            let cfg = this.config as FrameConfig;
            let idx = cfg.widgets.findIndex(x => x.id === widget.id);
            if (idx >= 0) {
                cfg.widgets.splice(idx, 1);
            }
        }
    }

    destroy() {
        // MsgService.warn('frame call destroy');
        // this.widgetMap.clear();
        // EventBus.$off('entity-loaded');
    }
}

export interface FrameConfig extends EntityConfig {
    widgets: WidgetConfig[];
}