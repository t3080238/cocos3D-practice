import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UiControl')
export class UiControl extends Component {
    // 場上硬幣總數
    @property({ type: Label })
    private totalCoin: Label = null;
    // 允許掉落硬幣數
    @property({ type: Label })
    private allowCoin: Label = null;
    // 投入硬幣數
    @property({ type: Label })
    private throwCoin: Label = null;
    // 贏得硬幣數
    @property({ type: Label })
    private winCoin: Label = null;
    // 掉落外面硬幣數
    @property({ type: Label })
    private dropCoin: Label = null;


    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start() {
        // Your initialization goes here.
    }

    public setTotalCoin(num: number) {
        this.totalCoin.string = `場上硬幣總數：${num}`;
    }
    public setAllowCoin(num: number) {
        this.allowCoin.string = `允許贏得硬幣數：${num}`;
    }
    public setThrowCoin(num: number) {
        this.throwCoin.string = `投入硬幣數：${num}`;
    }
    public setWinCoin(num: number) {
        this.winCoin.string = `贏得硬幣數：${num}`;
    }
    public setDropCoin(num: number) {
        this.dropCoin.string = `掉落外面硬幣數：${num}`
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
