import { _decorator, Component, Node, Prefab, RigidBodyComponent, systemEvent, SystemEvent, EventMouse, Vec3, v3, instantiate, PhysicsSystem, Material, MeshRenderer } from 'cc';
const { ccclass, property } = _decorator;
import { UiControl } from './uiControl'
import { RandCoin } from '../rand/randCoin'

@ccclass('CoinControl')
export class CoinControl extends Component {
    private randCoin: RandCoin = null;
    private coinList: Node[] = [];
    private isInit: boolean = true;
    private adjustMass: number = 1;
    // 允許掉落硬幣數
    private allowCoin: number = 0;
    // 投入硬幣數
    private throwCoin: number = 0;
    // 贏得硬幣數
    private winCoin: number = 0;
    // 掉落外面硬幣數
    private dropCoin: number = 0;

    @property({ type: UiControl })
    public uiControl: UiControl = null;
    @property({ type: Prefab })
    public coinPrefab: Prefab = null;
    @property({ type: Node })
    public plane: Node = null;
    @property({ type: Node })
    public pump: Node = null;
    @property({ type: Material })
    private coin2Material: Material = null;

    onLoad() {
        PhysicsSystem.instance.allowSleep = false;
        this.randCoin = new RandCoin();
    }

    start() {
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * 8 - 4;
            let z = Math.random() * 4 + 5;
            this.addCoin(v3(x, 1.5, z));
        }

        // setInterval(() => {
        //     let x = Math.random() * 8 - 4;
        //     this.dropCoin(v3(x, 1.5, 3));
        // }, 5000);

        this.isInit = false;
    }

    public addCoin(position: Vec3) {
        if (!position) return;
        if (this.coinList.length > 100) return;

        position.x = position.x > 4 ? 4 : position.x;
        position.x = position.x < -4 ? -4 : position.x;
        let coin = instantiate(this.coinPrefab);
        coin.position.set(position)
        this.node.addChild(coin);
        this.coinList.push(coin);

        this.uiControl.setTotalCoin(this.coinList.length);

        if (this.isInit) return;
        this.throwCoin++;
        this.uiControl.setThrowCoin(this.throwCoin);

        this.allowCoin += this.randCoin.addCoin();
        this.uiControl.setAllowCoin(this.allowCoin);
    }

    update(deltaTime: number) {
        const rigidBody = this.pump.getComponent(RigidBodyComponent);

        this.coinList.forEach((coin, i) => {
            if (coin.position.y < -10) {
                this.coinList.splice(i, 1);
                this.node.removeChild(coin);

                if (coin.position.z > 9.9) {
                    this.winCoin++;
                    this.uiControl.setWinCoin(this.winCoin);
                    this.allowCoin--
                    this.uiControl.setAllowCoin(this.allowCoin);
                } else {
                    this.dropCoin++;
                    this.uiControl.setWinCoin(this.dropCoin);
                }

                coin.destroy();
            }

            this.uiControl.setTotalCoin(this.coinList.length);
            // if (coin.position.x < -0.3) {
            //     const rigidBody = coin.getComponent(RigidBodyComponent);
            //     rigidBody.wakeUp();
            // }
        })
    }

    public setMass(mass: number) {
        this.adjustMass += mass;
        this.adjustMass = this.adjustMass < 1 ? 1 : this.adjustMass;
        console.log('adjustMass', this.adjustMass);

        this.coinList.forEach((coin) => {
            if (coin.position.z > 8.5) {
                coin.getComponent(RigidBodyComponent).mass = this.adjustMass;
                // coin.material = this.setMaterial({ diffuseColor: new BABYLON.Color3(1, 0.8, 0.5) });
                // coin.getComponent(MeshRenderer).material = this.coin2Material;
                coin.getComponent(MeshRenderer).setMaterial(this.coin2Material, 0);
            }
        })
    }
}
