import { Grade } from "../../fsrs";
import { Knowledge, LearningAction } from "../types";

export const mockKnowledges: Knowledge[] = [
    {
      id: '1',
      name: 'Какая столица Франции?',
      question: 'Какой город является столицей Франции?',
      answer: 'Столицей Франции является Париж.',
      reviewState: {
        lastReviewDate: new Date('2024-07-01'),
        nextReviewDate: new Date('2024-07-15'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-06-01'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-06-01'),
            nextReviewDate: new Date('2024-06-15'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-06-15'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-06-15'),
            nextReviewDate: new Date('2024-07-01'),
            rememberInterval: 16,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '2',
      name: 'Какой самый большой океан в мире?',
      question: 'Какой океан является самым большим на Земле?',
      answer: 'Тихий океан является самым большим океаном в мире.',
      reviewState: {
        lastReviewDate: new Date('2024-07-05'),
        nextReviewDate: new Date('2024-07-19'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-06-15'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-06-15'),
            nextReviewDate: new Date('2024-06-29'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-06-29'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-06-29'),
            nextReviewDate: new Date('2024-07-05'),
            rememberInterval: 6,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '3',
      name: 'Какая самая высокая гора в мире?',
      question: 'Какая гора является самой высокой на Земле?',
      answer: 'Самой высокой горой в мире является Эверест, его пик возвышается на 29 032 фута (8 849 метров) над уровнем моря.',
      reviewState: {
        lastReviewDate: new Date('2024-07-10'),
        nextReviewDate: new Date('2024-07-24'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-06-20'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-06-20'),
            nextReviewDate: new Date('2024-07-04'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-07-04'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-07-04'),
            nextReviewDate: new Date('2024-07-10'),
            rememberInterval: 6,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '4',
      name: 'Какая самая большая планета в нашей Солнечной системе?',
      question: 'Какая планета в нашей Солнечной системе является самой большой?',
      answer: 'Юпитер является самой большой планетой в нашей Солнечной системе.',
      reviewState: {
        lastReviewDate: new Date('2024-07-15'),
        nextReviewDate: new Date('2024-07-29'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-06-25'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-06-25'),
            nextReviewDate: new Date('2024-07-09'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-07-09'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-07-09'),
            nextReviewDate: new Date('2024-07-15'),
            rememberInterval: 6,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '5',
      name: 'Какая самая маленькая планета в нашей Солнечной системе?',
      question: 'Какая планета в нашей Солнечной системе является самой маленькой?',
      answer: 'Меркурий является самой маленькой планетой в нашей Солнечной системе.',
      reviewState: {
        lastReviewDate: new Date('2024-07-20'),
        nextReviewDate: new Date('2024-08-03'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-07-01'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-07-01'),
            nextReviewDate: new Date('2024-07-15'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-07-15'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-07-15'),
            nextReviewDate: new Date('2024-07-20'),
            rememberInterval: 5,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '6',
      name: 'Какой химический символ золота?',
      question: 'Какой химический символ элемента золота?',
      answer: 'Химический символ золота - Au.',
      reviewState: {
        lastReviewDate: new Date('2024-07-25'),
        nextReviewDate: new Date('2024-08-08'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-07-06'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-07-06'),
            nextReviewDate: new Date('2024-07-20'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-07-20'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-07-20'),
            nextReviewDate: new Date('2024-07-25'),
            rememberInterval: 5,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '7',
      name: 'Какой химический символ воды?',
      question: 'Какой химический символ соединения воды?',
      answer: 'Химический символ воды - H2O.',
      reviewState: {
        lastReviewDate: new Date('2024-07-30'),
        nextReviewDate: new Date('2024-08-13'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-07-11'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-07-11'),
            nextReviewDate: new Date('2024-07-25'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-07-25'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-07-25'),
            nextReviewDate: new Date('2024-07-30'),
            rememberInterval: 5,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '8',
      name: 'Какая столица Соединенных Штатов Америки?',
      question: 'Какой город является столицей Соединенных Штатов Америки?',
      answer: 'Столицей Соединенных Штатов Америки является Вашингтон, округ Колумбия.',
      reviewState: {
        lastReviewDate: new Date('2024-08-04'),
        nextReviewDate: new Date('2024-08-18'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-07-16'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-07-16'),
            nextReviewDate: new Date('2024-07-30'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-07-30'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-07-30'),
            nextReviewDate: new Date('2024-08-04'),
            rememberInterval: 5,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
      id: '9',
      name: 'Какой самый большой океан в мире?',
      question: 'Какой океан является самым большим в мире?',
      answer: 'Тихий океан является самым большим океаном в мире.',
      reviewState: {
        lastReviewDate: new Date('2024-08-09'),
        nextReviewDate: new Date('2024-08-23'),
        rememberInterval: 14,
        stability: 4,
        difficulty: 2,
        grade: Grade.Good,
        targetRetrievability: 0.8
      },
      learningHistory: [
        {
          id: '1',
          date: new Date('2024-07-21'),
          action: LearningAction.Created,
          reviewState: {
            lastReviewDate: new Date('2024-07-21'),
            nextReviewDate: new Date('2024-08-04'),
            rememberInterval: 14,
            stability: 3,
            difficulty: 3,
            grade: Grade.Good,
            targetRetrievability: 0.7
          }
        },
        {
          id: '2',
          date: new Date('2024-08-04'),
          action: LearningAction.Reviewed,
          reviewState: {
            lastReviewDate: new Date('2024-08-04'),
            nextReviewDate: new Date('2024-08-09'),
            rememberInterval: 5,
            stability: 4,
            difficulty: 2,
            grade: Grade.Good,
            targetRetrievability: 0.8
          }
        }
      ]
    },
    {
        id: '10',
        name: 'Какой химический символ серебра?',
        question: 'Какой химический символ элемента серебра?',
        answer: 'Химический символ серебра - Ag.',
        reviewState: {
          lastReviewDate: new Date('2024-08-14'),
          nextReviewDate: new Date('2024-08-28'),
          rememberInterval: 14,
          stability: 4,
          difficulty: 2,
          grade: Grade.Good,
          targetRetrievability: 0.8
        },
        learningHistory: [
          {
            id: '1',
            date: new Date('2024-07-26'),
            action: LearningAction.Created,
            reviewState: {
              lastReviewDate: new Date('2024-07-26'),
              nextReviewDate: new Date('2024-08-09'),
              rememberInterval: 14,
              stability: 3,
              difficulty: 3,
              grade: Grade.Good,
              targetRetrievability: 0.7
            }
          },
          {
            id: '2',
            date: new Date('2024-08-09'),
            action: LearningAction.Reviewed,
            reviewState: {
              lastReviewDate: new Date('2024-08-09'),
              nextReviewDate: new Date('2024-08-14'),
              rememberInterval: 5,
              stability: 4,
              difficulty: 2,
              grade: Grade.Good,
              targetRetrievability: 0.8
            }
          }
        ]
      }
  ];