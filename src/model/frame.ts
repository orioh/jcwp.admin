import { Entity, EntityConfig, EntityType } from './entity';
import { EventBus } from 'src/service/eventBus';
import { Widget, WidgetConfig } from './widget';
import { MsgService } from 'src/service/msgService';

export abstract class Frame extends Entity {

    widgetMap: Map<string, Entity>;

    constructor() {
        super(EntityType.Frame);
        this.widgetMap = new Map<string, Entity>();
        console.log('frame construcor', this.widgetMap)

        EventBus.$on('entity-loaded', (e: any) => { this.onEntityLoaded(e) });
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
        this.widgetMap.clear();
        EventBus.$off('entity-loaded', (e: any) => { this.onEntityLoaded(e) } );
    }
}

export interface FrameConfig extends EntityConfig {
    widgets: WidgetConfig[];
}