import React, { useState } from "react";
import { Box, Text } from "ink";
import { ArticleDto } from "../models/article.model";
import { SelectText } from "./common/SelectText";
import { Input } from "./common/Input";
import { primary } from "../styles/colors";
import { ConfirmationInput } from "./common/ConfirmationInput";
import { ArticlesService } from "../modules/articles/articles-service";
import { FileAccess } from "../modules/git/file-access";
import { delay } from "../environment/global";

enum UpdateArticleState {
  Prompt,
  UpdateField,
  AwaitConfirmation,
  Complete,
  Error
}

const updatableFields = [
  ['Title', 'title'],
  ['Oneliner', 'oneliner'],
  ['File path', 'filePath'],
  ['Tags', 'tags'],
  ['Submit and update', 'complete'],
];

export const UpdateArticle = ({article, service, onUpdate}: UpdateArticleProps) => {
  const [state, setState] = useState(UpdateArticleState.Prompt);
  const [field, setField] = useState<string>(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string>(null);

  const onConfirmation = async (confirm: boolean) => {
    if (!confirm) {
      onUpdate();
      return;
    }

    const [updated, error] = await service.update(article);

    if (updated) {
      setState(UpdateArticleState.Complete);
    } else {
      setState(UpdateArticleState.Error);
      setError(error);
    }

    setCountdown(3);
    await delay(1000);
    setCountdown(2);
    await delay(1000);
    setCountdown(1);
    await delay(1000);

    onUpdate();
  }

  return (
    <>
      {state === UpdateArticleState.Prompt && (
        <Box flexDirection='column'>
          <Text color={primary[200]}>Update article {article.url}</Text>
          <SelectText
            elements={updatableFields.map(([label]) => label)} 
            onSelect={fieldIndex => {
              const [_, field] = updatableFields[fieldIndex];
              if (field === 'complete') {
                setState(UpdateArticleState.AwaitConfirmation);
                return;
              }

              setField(field);
              setState(UpdateArticleState.UpdateField);
            }}
          />
        </Box>
      )}

      {state === UpdateArticleState.UpdateField && (
        <UpdateArticleField
          field={field}
          value={(article as any)[field]}
          onChange={value => {
            if (field === 'tags') {
              article.tags = value
                .split(',')
                .map(tag => tag.trim());
            } else {
              (article as any)[field] = value;
            }

            setState(UpdateArticleState.Prompt);
          }}
        />
      )}

      {state === UpdateArticleState.AwaitConfirmation && (
        <Box flexDirection='column'>
          <Text color={primary[200]}>{JSON.stringify(article, null, 2)}</Text>
          <ConfirmationInput
            promptMessage={`Update article ${article.url}?`}
            onSubmit={onConfirmation}
          />
        </Box>
      )}

      {state === UpdateArticleState.Complete && (
        <Text color='green'>✔ Article {article.url} updated.</Text>
      )}

      {state === UpdateArticleState.Error && (
        <Text color='red'>❌ {error}</Text>
      )}

      {(state === UpdateArticleState.Complete || state === UpdateArticleState.Error) &&
        <Box marginBottom={0.5}>
          <Text color={primary[200]}>Retuning to articles view in {countdown}...</Text>
        </Box>
      }
    </>
  )
}

export interface UpdateArticleProps {
  article: ArticleDto;
  service: ArticlesService
  onUpdate: () => void;
}

const UpdateArticleField = ({field, value, onChange}: UpdateArticleFieldProps) => {
  return (
    <Box flexDirection='column'>
      <Text color={primary[200]}>Update field {field}</Text>
      <Text color='gray'>(old value: {value})</Text>
      <Input promptMessage='New value:' onSubmit={onChange}/>
    </Box>
  )
}

export interface UpdateArticleFieldProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
}
