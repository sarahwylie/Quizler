import fs from 'fs'
// import { min } from 'underscore';
// import inquirer, { prompt } from 'inquirer'

export const chooseRandom = (array, numItems) => {
  if (array.length <= 1) { return array }
  const randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  if (1 < numItems >= array.length) { numItems = randomNum(1, array.length) }
  return Array.apply(array, { length: numItems })
}


export const createPrompt = ({numQuestions = 1, numChoices = 2} = {}) => {

  let questions = [...Array(numQuestions)].reduce((res, curr, i) => [...res, {
    type: 'input',
    name: `question-${(i+1)}`,
    message: `Enter question ${(i+1)}`
    }, ...[...Array(numChoices)].map((el, x) => ({
      type: 'input',
      name: `question-${(i+1)}-choice-${x+1}`,
      message: `Enter answer choice ${x+1} for question ${(i+1)}`
    })
    )], [])  
  return questions;
}

 export const createQuestions = (ans = {}) => {

  let quiz = Object.keys(ans).reduce((val, key) => {
    return key.includes('choice') ? [...val] : [...val, {
    type: 'list',
    name: key,
    message: ans[key],
    choices: [
      ...Object.keys(ans).reduce((el, ch) =>
      ch.includes(`${key}-choice`) ? [...el, ans[ch]] : [...el], []
      )
    ]
    }]
  }, [])
  // console.log(quiz)
return quiz 
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })

    