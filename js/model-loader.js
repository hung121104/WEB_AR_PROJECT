const models = {
    'fish': {
        model: './models3D/fish.glb',
        pattern: './pattern/pattern-fishQR.patt',
        scale: '0.5 0.5 0.5',
        rotation: '-90 0 0'
    },
    'robot': {
        model: './models3D/robot.glb',
        pattern: './pattern/pattern-robotQR.patt',
        scale: '0.2 0.2 0.2',
        rotation: '-90 0 0'
    }
};

function loadModels() {
    // Clear existing markers
    const existingMarkers = document.querySelectorAll('a-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Create a marker and entity for each model
    Object.entries(models).forEach(([name, config]) => {
        const marker = document.createElement('a-marker');
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', config.pattern);
        marker.id = `marker-${name}`;

        const entity = document.createElement('a-entity');
        entity.setAttribute('gltf-model', config.model);
        entity.setAttribute('scale', config.scale);
        entity.setAttribute('rotation', config.rotation);
        entity.setAttribute('position', '0 0 0');

        marker.appendChild(entity);
        document.querySelector('a-scene').appendChild(marker);
    });
}

// Initialize all models on load
window.addEventListener('load', loadModels);