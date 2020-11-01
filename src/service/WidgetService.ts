import { Vue } from 'vue-property-decorator';


class _WdigetService {

    private _list: Map<string, WidgetRegisterItem> = new Map<string, WidgetRegisterItem>();

    public registerGroup(group: string, list: WidgetRegister[]) {

        if (list) {
            list.forEach((w) => {
                let tmp: WidgetRegisterItem = {
                    group: group,
                    ...w,
                }
                if (this._list.has(tmp.name)) {
                    console.error(`widget '${tmp.name}' already registered`);
                } else {
                    this._list.set(tmp.name, tmp);
                }
            });
        }
        
    }

    public getWidgetDef(key: string) {
        return this._list.get(key);
    }

}


export interface WidgetRegister {
    name: string,
    title: string,
    icon?: string,
    cls: Vue,
}
export interface WidgetRegisterItem extends WidgetRegister {
    group: string,
}

const WidgetService = new _WdigetService();

export { WidgetService };
