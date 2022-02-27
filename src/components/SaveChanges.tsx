import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import { Input } from './common/Input';
import { ConfirmationInput } from './common/ConfirmationInput';
import { createCommit } from '../modules/git/create-commit';
import { global, Operation } from '../environment/global';
import { accent } from '../styles/colors';

enum SaveChangesState {
  PromptCommitMessage,
  PromptConfirm,
  Saving,
  Failed,
  Saved
}

const renderOperation = ({ operation, article: {url} }: Operation, index: number) => {
  if (operation === 'create') {
    return <Text key={index} color='green'>Article {url} created ✔.</Text>
  }

  if (operation === 'delete') {
    return <Text key={index} color='red'>Article {url} deleted 💀.</Text>
  }

  // update
  return <Text key={index} color={accent[500]}>Article {url} updated 🔎.</Text>
}

export const SaveChanges = () => {
  const [error, setError] = useState<Error>(null);
  const [state, setState] = useState(SaveChangesState.PromptCommitMessage);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [commitMessage, setCommitMessage] = useState('');

  const onConfirmed = async () => {
    setState(SaveChangesState.Saving);

    try {
      await createCommit(commitMessage);
      await global.manager!.push();
      setState(SaveChangesState.Saved);
    } catch (error) {
      setState(SaveChangesState.Failed);
      setError(error);
    }
  }

  useEffect(() => {
    setOperations(global.operations);
  }, []);

  const renderState = () => {
    switch (state) {
      case SaveChangesState.PromptCommitMessage:
        const onSubmit = (value: string) => {
          setCommitMessage(value);
          setState(SaveChangesState.PromptConfirm);
        }
        return <Input promptMessage='Commit message' onSubmit={onSubmit}/>

      case SaveChangesState.PromptConfirm:
        const onConfirm = async (confirm: boolean) => {
          confirm && await onConfirmed();
        }
        return <ConfirmationInput promptMessage='Commit and push changes?' onSubmit={onConfirm}/>

      case SaveChangesState.Saving:
        return <Text color='gray'>🕗 Committing and pushing changes...</Text>;

      case SaveChangesState.Failed:
        return <Text color='red'>❌ {error.message}</Text>;

      case SaveChangesState.Saved:
        return <Text color='green'>Commit {commitMessage} created and pushed to the remote repository.</Text>;
    }
  }

  return (
    <>
      {operations.map(renderOperation)}
      {operations.length === 0 && <Text color='gray'>No changes to commit.</Text>}
      {renderState()}
    </>
  )
}