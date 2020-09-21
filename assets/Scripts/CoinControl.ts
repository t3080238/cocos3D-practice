import { _decorator, Component, Node, Prefab, RigidBodyComponent, systemEvent, SystemEvent, EventMouse, Vec3, v3, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinControl')
export class CoinControl extends Component {
    private coinList: Node[] = [];

    @property({ type: Prefab })
    public coinPrefab: Prefab = null;
    @property({ type: Node })
    public plane: Node = null;
    @property({ type: Node })
    public pump: Node = null;


    onLoad() {
        this.setInputActive(true)
    }

    start() {
        for (let i = 0; i < 20; i++) {
            let z = Math.random() * 9 - 4.5;
            let x = Math.random() * 7.5 - 3.5;
            this.dropCoin(v3(x, 1.5, z));
        }

        setInterval(() => {
            if (this.coinList.length > 100) return;
            let z = Math.random() * 9 - 4.5;
            this.dropCoin(v3(-3.5, 1.5, z));
        }, 5000)
    }

    public setInputActive(active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        }
    }

    private onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) {
            console.log(event);
        } else if (event.getButton() === 2) {
            console.log(event);
        }
    }

    private dropCoin(position: Vec3) {
        if (!position) return;

        let coin = instantiate(this.coinPrefab);
        coin.position.set(position)
        this.node.addChild(coin);
        this.coinList.push(coin);

    }

    update(deltaTime: number) {
        const rigidBody = this.pump.getComponent(RigidBodyComponent);
        console.log(rigidBody.isSleeping);

        this.coinList.forEach((coin, i) => {
            if (coin.position.y < -10) {
                this.coinList.splice(i, 1);
                this.node.removeChild(coin);
                coin.destroy();
            }
            if (coin.position.x < -0.3) {
                const rigidBody = coin.getComponent(RigidBodyComponent);
                rigidBody.wakeUp();
            }

        })
    }
}
