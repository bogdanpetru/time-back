import { Project } from '../../models/project';

const data = [
  {
    name: 'work',
    id: '123',
    pomodoros: [
      {
        name: 'pomodoro 1',
        id: '123-work',
        startTime: 0,
      },
      {
        name: 'pomodoro 1',
        id: '123-work',
        startTime: 2,
      }
    ]
  }
]

export async function getProjects(): Promise<Project[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.map(Project.of));
    }, 1000);
  });
}