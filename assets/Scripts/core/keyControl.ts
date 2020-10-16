import { _decorator, Component, Node, systemEvent, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KeyControl')
export class KeyControl extends Component {
    start() {
        // Your initialization goes here.
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        window.window.onkeydown = (event) => {
            this.onKeyDown(event);
        };

        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        window.window.onkeyup = (event) => {
            this.onKeyUp(event);
        };
    }

    private onKeyDown(event) {
        console.log('onKeyDown', event.keyCode);
        switch (event.keyCode) {
            // 空白鍵
            case 32:
                break;
            // 方向鍵上（同空白鍵）
            case 38:
                break;
            // 左鍵
            case 37:
                break;
            // 右鍵
            case 39:
                break;
            // 方向鍵下（同Z鍵）
            case 40:
                break;
            // Z鍵
            case 90:
                break;
            // X鍵
            case 88:
                break;
            // A鍵
            case 65:
                break;
            default:
                break;
        }
    }

    private onKeyUp(event) {
        switch (event.keyCode) {
            // 空白鍵
            case 32:
                break;
            // 方向鍵上（同空白鍵）
            case 38:
                break;
            // 左鍵
            case 37:
                break;
            // 右鍵
            case 39:
                break;
            // 方向鍵下（同Z鍵）
            case 40:
                break;
            // Z鍵
            case 90:
                break;
            default:
                break;
        }
    }
}

