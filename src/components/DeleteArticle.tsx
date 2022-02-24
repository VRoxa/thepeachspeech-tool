import { Box, Text } from "ink";
import React from "react";
import { useState } from "react";
import { delay } from "../environment/global";
import { ArticleDto } from "../models/article.model";
import { ArticlesService } from "../modules/articles/articles-service";
import { primary } from "../styles/colors";
import { ConfirmationInput } from "./common/ConfirmationInput";

enum DeleteArticleState {
  PromptConfirmation,
  Confirmed,
  Deleted,
  Error
}


export const DeleteArticle = ({ article, onDelete, service }: DeleteArticleProps) => {
  const [state, setState] = useState(DeleteArticleState.PromptConfirmation);
  const [countdown, setCountdown] = useState(0);

  const onConfirmation = async (confirm: boolean) => {
    if (!confirm) {
      // unmount component
      onDelete();
      return;
    }

    setState(DeleteArticleState.Confirmed);
    const deleted = await service.deleteArticle(article);

    setCountdown(3);
    setState(deleted 
      ? DeleteArticleState.Deleted
      : DeleteArticleState.Error
    );

    await delay(1000);
    setCountdown(2);
    await delay(1000);
    setCountdown(1);
    await delay(1000);
    onDelete();
  }

  return (
    <>
      {state === DeleteArticleState.PromptConfirmation &&
        <ConfirmationInput
          promptMessage={`Delete article ${article.url}?`}
          onSubmit={onConfirmation}
        />
      }

      {state === DeleteArticleState.Confirmed &&
        <Text color='gray'>🕗 Deleting article {article.url}</Text>
      }

      {state === DeleteArticleState.Deleted &&
        <Text color='green'>✔ Article {article.url} deleted.</Text>
      }

      {state === DeleteArticleState.Error &&
        <Text color='red'>❌ Could not delete article {article.url}. Article not found.</Text>
      }

      {(state === DeleteArticleState.Deleted || state === DeleteArticleState.Error) &&
        <Box marginBottom={0.5}>
          <Text color={primary[200]}>Retuning to articles view in {countdown}...</Text>
        </Box>
      }
    </>
  );
}

export interface DeleteArticleProps {
  service: ArticlesService
  article: ArticleDto;
  onDelete: () => void;
}
