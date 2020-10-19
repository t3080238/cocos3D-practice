import { _decorator, Component, Vec3, v3, RigidBodyComponent, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PumpControl')
export class PumpControl extends Component {
    /* class member could be defined like this */
    // dummy = '';
    private rigidBody: RigidBody
    private limitZ: number = 1;
    private pushV = 1;

    start() {
        // Your initialization goes here.
        this.rigidBody = this.getComponent(RigidBodyComponent)
    }

    update(deltaTime: number) {
        /**HACK */
        if (this.rigidBody.isKinematic) {
            const impl = this.rigidBody.body.impl;
            const t = impl['getWorldTransform']();
            impl['getMotionState']()['setWorldTransform'](t);
        }

        Vec3.add(this.node.position, this.node.position, v3(0, 0, this.pushV * deltaTime));
        this.node.setPosition(this.node.position);
        // this.rigidBody.setLinearVelocity(v3(this.pushV * deltaTime, 0, 0));

        // this.rigidBody.setLinearVelocity(new Vec3(this.pushV * deltaTime, 0, 0));

        if (this.node.position.z <= -3) this.pushV = 1;
        if (this.node.position.z >= this.limitZ) this.pushV = -1;
    }

    public setLimitZ(num: number) {
        this.limitZ += num;
        this.limitZ = this.limitZ < -3 ? -3 : this.limitZ;
        this.limitZ = this.limitZ > 7 ? 7 : this.limitZ;
        console.log('limitZ', this.limitZ);
    }
}
