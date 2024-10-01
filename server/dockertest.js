const Docker = require('dockerode');
const docker = new Docker({ host: '127.0.0.1', port: 2375 });

// Pull the nginx image
docker.pull('nginx', (err, stream) => {
    if (err) {
        return console.error('Error pulling image:', err);
    }

    // Stream the progress of the pull
    docker.modem.followProgress(stream, onFinished, onProgress);
});

function onFinished() {
    console.log('Image pulled successfully.');

    // Create and start a new container
    docker.createContainer({
        Image: 'nginx',
        name: 'my-nginx',
    }, (err, container) => {
        if (err) {
            return console.error('Error creating container:', err);
        }

        container.start((err, data) => {
            if (err) {
                return console.error('Error starting container:', err);
            }

            console.log('Container started:', data);
        });
    });
}

function onProgress(event) {
    console.log(event);
}
