import React, { useState } from "react";
import { Text } from 'ink';
import { ArticleDto } from "../models/article.model";
import { ArticlesService } from "../modules/articles/articles-service";
import { FileAccess } from "../modules/git/file-access";
import { NewArticleInput } from "./NewArticleInput";

enum ComponentState {
  Prompt,
  Adding,
  Added,
  NotValid
}

export const CreateArticle = () => {
  const articlesService = new ArticlesService(new FileAccess());
  const [article, setArticle] = useState<ArticleDto>();
  const [error, setError] = useState(null);
  const [state, setState] = useState(ComponentState.Prompt);

  const onArticleComplete = async (article: ArticleDto) => {
    setArticle(article);
    setState(ComponentState.Adding);

    const [valid, error] = await articlesService.addArticle(article);
    
    if (valid) {
      setState(ComponentState.Added);
    } else {
      setError(error);
      setState(ComponentState.NotValid);
    }
  }

  const renderState = () => {
    switch(state) {
      case ComponentState.Prompt:
        return <NewArticleInput onComplete={onArticleComplete} />;
      case ComponentState.Adding:
        return <Text color="gray">🕗 Adding article {article.url}...</Text>;
      case ComponentState.Added:
        return <Text color="green">✔ Article {article.url} added!</Text>;
      case ComponentState.NotValid:
        return <Text color="red">❌ {error}</Text>;
    }
  }

  return (
    <>
      {renderState()}
    </>
  )
}
