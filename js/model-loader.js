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
};

function loadModel() {
    // Get model name from hash or default to fish
    const modelName = window.location.hash.slice(1) || 'fish';
    
    const modelConfig = models[modelName];
    if (!modelConfig) {
        document.getElementById('instructions').innerHTML = 'Model not found!';
        return;
    }

    // Remove existing marker if any
    const existingMarker = document.querySelector('a-marker');
    if (existingMarker) {
        existingMarker.remove();
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

// Listen for hash changes to switch models
window.addEventListener('hashchange', loadModel);