export const swarmCreateNetwork = async (connection, name) => {
  const networkExists = await connection.exec(`docker network inspect ${name} > /dev/null 2>&1`)
    .then(() => true)
    .catch(() => false)

  if (networkExists) {
    return;
  }

  await connection.exec(`docker network create ${name} --scope=swarm --driver overlay`);
}

export default swarmCreateNetwork;
