import { getProjects } from './services/projects/api';
import { Project } from "./models/project";
import { Pomodoro } from "./models/pomodoro";

async function test() {
  const result = await getProjects();
  console.log(result);
}

test();