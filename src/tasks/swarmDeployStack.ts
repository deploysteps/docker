import path from 'path';
import { Connection, createFile } from "@deploysteps/core";

type EnvMap = {
  [key: string]: string;
}

export const swarmDeployStack = async (connection: Connection, stackFile: string, name: string, env: EnvMap) => {
  const folder = path.dirname(stackFile);
  const file = path.basename(stackFile);

  if (env) {
    // Create env file name with stack name
    const envFileName = `.${name}.env`;
    const envFilePath = path.join(folder, envFileName);

    // Create env file with variables
    await createFile(
      connection,
      envFilePath,
      Object.keys(env).map(key =>
        `export ${key}="${env[key]}"`
      ).join('\n'),
      {}
    );

    // Deploy stack with env file
    await connection.exec(
      `cd ${folder} && . ${envFileName} && docker stack deploy -c ${file} ${name}`
    );
  } else {
    // Deploy stack without env variables
    await connection.exec(
      `cd ${folder} && docker stack deploy -c ${file} ${name}`
    );
  }
}

export default swarmDeployStack;
