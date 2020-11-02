import * as def from 'src/model';

export default class Funcs {

    static uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
    }

    static createWidgetConfig(name: string, widgetName: string): def.WidgetConfig {
        return {
            id: Funcs.uuid(),
            name: name,
            widgetName: widgetName,
            x: 0,
            y: 0,
            sizex: 3,
            sizey: 3
        };
    }

    static createFrameConfig(name: string):def.FrameConfig {
        return {
            id: Funcs.uuid(),
            name: name,
            widgets: []
        };
    }
}