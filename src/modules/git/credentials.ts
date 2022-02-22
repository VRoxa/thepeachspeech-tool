import { Cred, RemoteCallbacks } from 'nodegit';
import environment from '../../environment/environment';
import { join } from 'path';

const sshPublicKeyPath = join(environment.keysPath, 'id_rsa.pub');
const sshPrivateKeyPath = join(environment.keysPath, 'id_rsa');

const getCredentials = (): Cred => {
  return Cred.sshKeyNew(
    'git',
    sshPublicKeyPath,
    sshPrivateKeyPath,
    ''
  );
}

export const getCredentialsCallbacks = (): RemoteCallbacks => {
  return  {
    certificateCheck: () => 1,
    credentials: getCredentials
  }
}