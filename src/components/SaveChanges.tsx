import React, { useState } from 'react';
import { Text } from 'ink';
import { Input } from './common/Input';
import { ConfirmationInput } from './common/ConfirmationInput';
import { createCommit } from '../modules/git/create-commit';
import { global } from '../environment/global';

enum SaveChangesState {
  PromptCommitMessage,
  PromptConfirm,
  Saving,
  Failed,
  Saved
}

export const SaveChanges = () => {
  const [error, setError] = useState<Error>(null);
  const [state, setState] = useState(SaveChangesState.PromptCommitMessage);
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
      {renderState()}
    </>
  )
}