import { _decorator, Component, Node, Prefab, RigidBodyComponent, systemEvent, SystemEvent, EventMouse, Vec3, v3, instantiate, PhysicsSystem } from 'cc';
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
        PhysicsSystem.instance.allowSleep = false;
    }

    start() {
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * 8 - 4;
            let z = Math.random() * 4 + 5;
            this.dropCoin(v3(x, 1.5, z));
        }

        setInterval(() => {
            let x = Math.random() * 8 - 4;
            this.dropCoin(v3(x, 1.5, 3));
        }, 5000)
    }

    public dropCoin(position: Vec3) {
        if (!position) return;
        if (this.coinList.length > 50) return;

        let coin = instantiate(this.coinPrefab);
        coin.position.set(position)
        this.node.addChild(coin);
        this.coinList.push(coin);
    }

    update(deltaTime: number) {
        const rigidBody = this.pump.getComponent(RigidBodyComponent);

        this.coinList.forEach((coin, i) => {
            if (coin.position.y < -10) {
                this.coinList.splice(i, 1);
                this.node.removeChild(coin);
                coin.destroy();
            }
            // if (coin.position.x < -0.3) {
            //     const rigidBody = coin.getComponent(RigidBodyComponent);
            //     rigidBody.wakeUp();
            // }

        })
    }
}