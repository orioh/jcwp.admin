import * as def from 'src/model';
import Funcs from 'src/service/funcs';

class _mock {

    // widgets: def.WidgetConfig[] = [];

    testFrame: def.FrameConfig;

    constructor(){
        this.init();
    }

    init(){
        this.testFrame = Funcs.createFrameConfig('test-frame');
        this.testFrame.widgets = [
            Funcs.createWidgetConfig('w1', 'Test'),
            Funcs.createWidgetConfig('w2', 'Test'),
        ]
    }

    
}


const Mock = new _mock();
export { Mock };
