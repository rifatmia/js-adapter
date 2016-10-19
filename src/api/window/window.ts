import Base from "../base"
import { Identity } from "../../identity"

// The window.Window name is taken
export default class _WindowModule extends Base {
    wrap(identity: Identity): _Window {
        return new _Window(this.wire, identity)
    }
}

export class _Window extends Base {
    constructor(wire, protected identity: Identity) {
        super(wire)
    }
    getBounds(): Promise<Bounds> {
        return this.wire.sendAction("get-window-bounds", this.identity.toWireObject())
            .then(({ payload }) => payload.data as Bounds)
    }
    focus(): Promise<void> {
        return this.wire.sendAction("focus-window", this.identity.toWireObject())
    }
}
export interface _Window {
    addEventListener(type: "focused", listener: Function) 
}

export interface Bounds {
    height: number
    width: number
    top: number
    left: number
    right?: number
    bottom?: number
}