import * as PIXI from '@pixi';

import {createGround} from './ground.js'
import {createRollerCoaster} from './rollercoaster.js'
import {createPetitMe} from './petitMe.js'

export async function createWorldView(screen) {
    const world = createContainer();
    let ground = await createGround(screen);
    const rc = await createRollerCoaster(ground.sprite, screen);
    const petitMe = await createPetitMe(screen);
    
    petitMe.positionOnGround(ground.sprite);
    world.addChild(ground.sprite, rc.container, petitMe.sprite);

    function createContainer() {
        const world = new PIXI.Container();
        world.width = 10000;
        world.height = 10000;
        world.pivot.x = 0;
        world.pivot.y = world.height / 2;
        return world;
    }

    function addChild(child) {
        return world.addChild(child);
    }

    return {
        container: world,
        petitMe,
        ground,
        rc,
        addChild,
        
    };
}