import { Box, Text, useInput } from "ink";
import React from "react";
import { useEffect, useState } from "react";
import { ArticleDto } from "../models/article.model";
import { ArticlesService } from "../modules/articles/articles-service"
import { FileAccess } from "../modules/git/file-access"
import { primary } from "../styles/colors";
import { Select } from "./common/Select";
import { DeleteArticle } from "./DeleteArticle";
import { UpdateArticle } from "./UpdateArticle";

enum ViewArticlesState {
  Idle,
  Delete,
  View,
  Update
}

export const ViewArticles = () => {
  const service = new ArticlesService(new FileAccess());
  const [articles, setArticles] = useState<ArticleDto[]>([]);
  const [state, setState] = useState(ViewArticlesState.Idle);
  const [selected, setSelected] = useState<ArticleDto | null>(null);

  const onViewArticle = (article: ArticleDto) => {
    console.log('On view article', article.title);
  }
  
  const onDeleteArticle = (article: ArticleDto) => {
    setSelected(article);
    setState(ViewArticlesState.Delete);
  }

  const onUpdateArticle = (article: ArticleDto) => {
    setSelected(article);
    setState(ViewArticlesState.Update);
  }

  useEffect(() => {
    service
      .getAll()
      .then(setArticles);
  }, [state]);

  return (
    <>
      {state === ViewArticlesState.Idle &&
        <Select
          elements={articles}
          onSelect={(article) => setSelected(article)}
          render={(article, selected, index) => 
            <SelectArticleContent
              article={article}
              selected={selected}
              index={index}
              handler={{
                onView: () => onViewArticle(article),
                onDelete: () => onDeleteArticle(article),
                onUpdate: () => onUpdateArticle(article)
              }}
            />
          }
        />
      }

      {state === ViewArticlesState.Delete &&
        <DeleteArticle 
          article={selected!}
          service={service}
          onDelete={() => setState(ViewArticlesState.Idle)}
        />
      }

      {state === ViewArticlesState.Update &&
        <UpdateArticle 
          article={selected!}
          service={service}
          onUpdate={() => setState(ViewArticlesState.Idle)}
        />
      }
    </>
  )
}

const SelectArticleContent = ({article, selected, handler}: SelectArticleContentProps) => {
  // TODO - Update operation selection by
  // disable parent select use arrow hook
  // And navigate to the options with left and right arrows.
  useInput((input) => {
    if (!selected) return;

    if (input === 'V' || input === 'v') {
      handler.onView();
      return;
    }

    if (input === 'D' || input === 'd') {
      handler.onDelete();
      return;
    }

    if (input === 'U' || input === 'u') {
      handler.onUpdate();
      return;
    }
  });

  return (
    <>
      {!selected &&
        <Text color={primary[200]}>{article.title}</Text>
      }

      {selected &&
        <Box
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          width='10%'
          minWidth={40}
        >
          <Text bold color={primary[500]}>{article.title}</Text>
          <Box
            flexDirection='row'
            justifyContent='space-around'
            width='100%'
          >
            <Text color={primary[800]}>(V) View 🔎</Text>
            <Text color={primary[800]}>(D) Delete 💀</Text>
            <Text color={primary[800]}>(U) Update 🔃</Text>
          </Box>
        </Box>
      }
    </>
  )
}

interface SelectArticleContentProps {
  article: ArticleDto;
  selected: boolean;
  index?: number;
  handler: {
    onView: () => void;
    onDelete: () => void;
    onUpdate: () => void;
  }
}
