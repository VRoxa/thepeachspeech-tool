import { Cred, RemoteCallbacks } from 'nodegit';
import path from 'path';

const getPath = path.join.bind(path, __dirname);
const sshPublicKeyPath = getPath('../../keys/id_rsa.pub');
const sshPrivateKeyPath = getPath('../../keys/id_rsa');

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