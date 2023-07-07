import path from 'path';

export const swarmDeployStack = async (connection, stackFile, name) => {
  const folder = path.dirname(stackFile);
  const file = path.basename(stackFile);

  // await connection.exec(`cd ${folder}/stacks && export $(cat .env) > /dev/null 2>&1; docker stack deploy -c ${file} ${name}`);
  await connection.exec(`cd ${folder} && docker stack deploy -c ${file} ${name}`);
}

export default swarmDeployStack;
