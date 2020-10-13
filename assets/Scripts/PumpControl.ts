import { _decorator, Component, Vec3, v3, RigidBodyComponent, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PumpControl')
export class PumpControl extends Component {
    /* class member could be defined like this */
    // dummy = '';
    private rigidBody: RigidBody

    private pushV = 1;
    start() {
        // Your initialization goes here.
        this.rigidBody = this.getComponent(RigidBodyComponent);

    }

    update(deltaTime: number) {
        Vec3.add(this.node.position, this.node.position, v3(this.pushV * deltaTime, 0, 0));
        this.node.setPosition(this.node.position);
        // this.rigidBody.setLinearVelocity(v3(this.pushV * deltaTime, 0, 0));

        // this.rigidBody.setLinearVelocity(new Vec3(this.pushV * deltaTime, 0, 0));

        if (this.node.position.x >= -3) this.pushV = -1;
        if (this.node.position.x <= -7) this.pushV = 1;
    }
}
