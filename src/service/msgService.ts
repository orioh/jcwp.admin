
class _MsgService {

    info(msg: string){
        this.message(MsgLevel.Info, msg);
    }
    warn(msg: string){
        this.message(MsgLevel.Warn, msg);
    }
    debug(msg: string){
        this.message(MsgLevel.Debug, msg);
    }
    error(msg: string){
        this.message(MsgLevel.Error, msg);
    }
    message(level: MsgLevel, msg:string){
        let lv = level.toString().padStart(5, ' ');
        let time = (new Date()).toLocaleString();
        console.log(`[${lv}] [${time}] ${msg}`);
    }
}

export enum MsgLevel {
    Info = 'Info',
    Warn = 'Warn',
    Debug = 'Debug',
    Error = 'Error'
}

const MsgService = new _MsgService();

export { MsgService };
