import { Connection } from "@deploysteps/core";

export const swarmCreateNetwork = async (connection: Connection, name: string) => {
  const networkExists = await connection.exec(`docker network inspect ${name} > /dev/null 2>&1`)
    .then(() => true)
    .catch(() => false)

  if (networkExists) {
    return;
  }

  await connection.exec(`docker network create ${name} --attachable --scope=swarm --driver overlay`);
}

export default swarmCreateNetwork;
