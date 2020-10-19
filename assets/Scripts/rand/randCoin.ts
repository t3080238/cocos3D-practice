import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RandCoin')
export class RandCoin extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start() {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
    public addCoin(): number {
        let list = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5];
        let rtp = 100;

        let randNum = list[Math.floor(Math.random() * list.length)];
        console.log(randNum);

        // 成功機率
        let probability = 100 / randNum;
        let resultNum = Math.random() * 100 < probability ? randNum : 0;

        return resultNum;
    }
}
