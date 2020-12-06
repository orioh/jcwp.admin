
class _MsgService {

    info(msg: string) {
        this.message(MsgLevel.Info, msg);
    }
    warn(msg: string) {
        this.message(MsgLevel.Warn, msg);
    }
    debug(msg: string) {
        this.message(MsgLevel.Debug, msg);
    }
    error(msg: string) {
        this.message(MsgLevel.Error, msg);
    }
    message(level: MsgLevel, msg: string) {
        let lv = level.toString().padStart(5, ' ');
        let time = (new Date()).toLocaleString();
        let log = `[${lv}] [${time}] ${msg}`;
        switch (level) {
            case MsgLevel.Warn:
                console.warn(log);
                break;

            case MsgLevel.Debug:
                console.warn(log);
                break;

            case MsgLevel.Error:
                console.error(log);
                break;

            default:
                console.log(log);
                break;
        }
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
