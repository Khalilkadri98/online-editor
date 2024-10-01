const fs = require('fs');
const path = require('path');
const tar = require('tar-fs');
const Docker = require('dockerode');
const docker = new Docker();

const getContainerName = (language) => {
  switch (language) {
    case 'javascript':
      return 'node-container';
    case 'java':
      return 'java-container';
    case 'c':
      return 'c-container';
    case 'react':
      return 'react-container';
    default:
      throw new Error('Unsupported language');
  }
};

const getFileName = (language) => {
  switch (language) {
    case 'javascript':
      return 'main.js';
    case 'java':
      return 'Main.java';
    case 'c':
      return 'main.c';
    case 'react':
      return 'App.js';
    default:
      throw new Error('Unsupported language');
  }
};

const getRunCommand = (language) => {
  switch (language) {
    case 'javascript':
      return ['node', 'main.js'];
    case 'java':
      return ['sh', '-c', 'javac Main.java && java Main'];
    case 'c':
      return ['sh', '-c', 'gcc -o a.out main.c && ./a.out'];
    case 'react':
      return ['sh', '-c', 'npm run build'];
    default:
      throw new Error('Unsupported language');
  }
};

const startContainerIfNeeded = async (container) => {
  const containerData = await container.inspect();
  if (!containerData.State.Running) {
    console.log(`Starting container ${container.id}`);
    await container.start();
  } else {
    console.log(`Container ${container.id} is already running`);
  }
};

const executeCode = async (req, res) => {
  const { code, language } = req.body;

  try {
    const containerName = getContainerName(language);
    const fileName = getFileName(language);
    const codeDir = path.join(__dirname, '../code');
    const filePath = path.join(codeDir, fileName);

    console.log(`Writing code to ${filePath}`);
    if (!fs.existsSync(codeDir)) {
      fs.mkdirSync(codeDir);
    }
    fs.writeFileSync(filePath, code);

    const container = docker.getContainer(containerName);
    await startContainerIfNeeded(container);

    console.log(`Creating tar stream for ${fileName}`);
    const pack = tar.pack(codeDir, {
      entries: [fileName],
    });

    console.log(`Uploading ${fileName} to container ${containerName}`);
    container.putArchive(pack, { path: '/usr/src/app' }, async (err) => {
      if (err) {
        console.error('Error uploading code:', err);
        await container.stop();
        return res.status(500).json({ output: 'Error uploading code' });
      }

      console.log(`Executing code in container ${containerName}`);
      const exec = await container.exec({
        AttachStdout: true,
        AttachStderr: true,
        Cmd: getRunCommand(language),
      });

      exec.start((err, stream) => {
        if (err) {
          console.error('Error starting exec:', err);
          container.stop();
          return res.status(500).json({ output: 'Error executing code' });
        }

        let output = '';
        stream.on('data', (data) => {
          output += data.toString();
        });

        stream.on('end', async () => {
          console.log(`Execution finished with output: ${output}`);
          await container.stop();
          res.json({ output });
        });

        stream.on('error', async (err) => {
          console.error('Stream error:', err);
          await container.stop();
          res.status(500).json({ output: 'Error executing code' });
        });
      });
    });
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({ output: 'Error executing code' });
  }
};

module.exports = { executeCode};