const models = {
    'fish': {
        model: './models3D/fish.glb',
        pattern: './pattern/fish-pattern-frame.patt',
        scale: '0.5 0.5 0.5',
        rotation: '-90 0 0'
    },
    'robot': {
        model: './models3D/robot.glb',
        pattern: './pattern/fish-pattern-frame.patt',
        scale: '0.5 0.5 0.5',
        rotation: '-90 0 0'
    }
    // Add more models here
};

function loadModel() {
    const urlParams = new URLSearchParams(window.location.search);
    const modelName = window.location.pathname.split('/').pop() || 'fish'; // default to fish if no model specified
    
    const modelConfig = models[modelName];
    if (!modelConfig) {
        document.getElementById('instructions').innerHTML = 'Model not found!';
        return;
    }

    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('url', modelConfig.pattern);

    const entity = document.createElement('a-entity');
    entity.setAttribute('gltf-model', modelConfig.model);
    entity.setAttribute('scale', modelConfig.scale);
    entity.setAttribute('rotation', modelConfig.rotation);
    entity.setAttribute('position', '0 0 0');

    marker.appendChild(entity);
    document.querySelector('a-scene').appendChild(marker);
}