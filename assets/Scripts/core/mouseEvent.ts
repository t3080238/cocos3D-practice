import { _decorator, Component, Node, systemEvent, SystemEvent, EventMouse, CameraComponent, geometry, PhysicsSystem, v3 } from 'cc';
import { CoinControl } from './coinControl';
const { ccclass, property } = _decorator;

@ccclass('MouseEvent')
export class MouseEvent extends Component {
    @property({ type: Node })
    private touchPlane: Node = null;
    @property({ type: CameraComponent })
    private camera: CameraComponent = null;
    @property({ type: CoinControl })
    private coinControl: CoinControl = null;


    private ray: geometry.ray;
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start() {
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        // Your initialization goes here.
        // this.touchPlane.on(Node.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    private onMouseUp(event) {
        console.log(event);
        console.log(event._x, event._y);

        if (event.getButton() === 0) {
        } else if (event.getButton() === 2) {
        }

        this.ray = new geometry.ray();
        this.camera.screenPointToRay(event._x, event._y, this.ray)
        // update (deltaTime: number) {
        //     // Your update function goes here.
        // }

        //基于物理碰撞器的射线检测
        if (PhysicsSystem.instance.raycast(this.ray)) {
            const r = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < r.length; i++) {
                const item = r[i];
                console.log(item.collider.node);
                console.log(this.touchPlane);

                if (item.collider.node === this.touchPlane) {
                    console.log(item.hitPoint.x);
                    console.log(this.coinControl);
                    this.coinControl.dropCoin(v3(item.hitPoint.x, 1.5, 3));
                }
            }
        }
    }
}