import { _decorator, Component, Vec3, v3, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PumpControl')
export class PumpControl extends Component {
    /* class member could be defined like this */
    // dummy = '';

    private pushV = 2;
    start () {
        // Your initialization goes here.
    }

    update (deltaTime: number) {
        Vec3.add(this.node.position, this.node.position, v3(this.pushV * deltaTime, 0, 0));
        this.node.setPosition(this.node.position);
        if (this.node.position.x >= -3) this.pushV = -2;
        if (this.node.position.x <= -7) this.pushV = 2;
    }
}
