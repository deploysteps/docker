# DeploySteps - Docker

A set of tasks for Docker.

## installDocker
The `installDocker($)` task ensures docker is installed on a debian/ubuntu based host.

- `$`: An ssh connection object

Usage:

```javascript
await installDocker($)
```

## swarmCreateNetwork
The `swarmCreateNetwork($, name)` task ensures a swarm network is created.

- `$`: An ssh connection object
- `name`: The name of the network

Usage:

```javascript
await swarmDeployStack($, 'example')
```

## swarmDeployStack
The `swarmDeployStack($, stackFile, name)` deploys a stack onto a swarm cluster.

- `$`: An ssh connection object
- `stackFile`: The remote path to the stack compose file
- `name`: The name of the stack

Usage:

```javascript
await swarmDeployStack($, '/home/devops/hello-world.yml', 'hello-world');
```
