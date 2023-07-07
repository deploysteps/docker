export const installDocker = async (connection) => {
  const dockerInstalled = await connection.script('which docker')
    .then(() => true)
    .catch(() => false);

  if (dockerInstalled) {
    return;
  }

  await connection.sudoScript(`
    #!/bin/bash

    # Update package information
    apt-get update

    # Install prerequisite packages
    apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

    # Verify that the key fingerprint is correct
    apt-key fingerprint 0EBFCD88

    # Set up the Docker stable repository
    echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Update package information for Docker's repository
    apt-get update

    # Install Docker
    apt-get install -y docker-ce docker-ce-cli containerd.io

    # Add the current user to the Docker group
    usermod -aG docker $SUDO_USER

    # Print out a message to log out and back in
    echo "Docker installed successfully. You need to log out and back in to use Docker without sudo."
  `);
};

export default installDocker;
