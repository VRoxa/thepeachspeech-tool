import React, { useState } from 'react';
import { Box, Text} from 'ink';
import { ArticleDto } from '../models/article.model';
import { Input } from './common/Input';

type CompleteStepFn = (title: string, article: ArticleDto) => void;
type TransformArticleFn = (value: string) => ArticleDto;

class StepControl {
  constructor(
    public title: string, 
    private transformArticleFn: TransformArticleFn,
    private completeStepFn: CompleteStepFn
  ) { }

  static factory(completeStepFn: CompleteStepFn) {
    return (title: string, articleFn: (value: string) => ArticleDto) => {
      return new StepControl(title, articleFn, completeStepFn);
    }
  }

  onSubmit = (value: string): void => {
    const article = this.transformArticleFn(value);
    const message = `${this.title} - ${value} ✔`;

    this.completeStepFn(message, article);
  }
}

export const NewArticleInput = ({ onComplete }: NewArticleInputProps) => {
  const [article, setArticle] = useState<ArticleDto>({});
  const [step, setStep] = useState<number>(0);
  const [previousValues, setPreviousValues] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const onSubmitStep = (message: string, article: ArticleDto): CompleteStepFn => {
    setPreviousValues([...previousValues, message]);
    setArticle(article);

    // All steps were completed
    if (step === steps.length - 1) {
      setCompleted(true);
      onComplete(article);
      return;
    }

    setStep(step + 1);
  }

  const stepFactory = StepControl.factory(onSubmitStep);
  const steps: StepControl[] = [
    stepFactory('File path', filePath => ({ ...article, filePath })),
    stepFactory('Title', title => ({ ...article, title })),
    stepFactory('Oneliner', oneliner => ({ ...article, oneliner })),
    stepFactory('URL', url => ({ ...article, url: url.toLocaleLowerCase() })),
    stepFactory('Tags', tagsRaw => {
      const tags = tagsRaw.split(',').map(tag => tag.trim());
      return { ...article, tags };
    })
  ];

  return (
    <>
      <Box flexDirection="column">
        {previousValues.map((message, index) => 
          <Text color="green" key={index}>{message}</Text>
        )}
      </Box>
    
      {!completed && 
        <Input
          promptMessage={steps[step].title} 
          onSubmit={steps[step].onSubmit} 
        />
      }
    </>
  );
}

export interface NewArticleInputProps {
  onComplete: (article: ArticleDto) => void;
}
