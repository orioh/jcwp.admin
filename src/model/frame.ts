import { Entity, EntityConfig, EntityType } from './entity';
import { EventBus } from 'src/service/eventBus';
import { Widget, WidgetConfig } from './widget';

export class Frame extends Entity {
    constructor() {
        super(EntityType.Frame);

        EventBus.$on('widget-loaded', this.onWidgetLoaded);
    }

    onWidgetLoaded(widget: Widget) {
        console.log('frame, get widget loaded', widget);
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
        EventBus.$off('widget-loaded', this.onWidgetLoaded);
    }
}

export interface FrameConfig extends EntityConfig {
    widgets: WidgetConfig[];
}