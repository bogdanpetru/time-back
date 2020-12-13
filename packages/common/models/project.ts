import { Pomodoro } from './pomodoro';
import { setIfDefiend } from './utils';

interface ProjectConfig {
	id?: string;
	name: string;
	description?: string;
	number_of_intervals?: number;
	break_size?: number;
	break_long_size?: number;
	break_long_nth?: number;
	pomodoros?: Pomodoro[],
}

export class Project {
	id: string = null
	name: string = null;
	description: string = null;
	number_of_intervals: number = 8;
	break_size: number = 25;
	break_long_size: number = null;
	break_long_nth: number = null;
	pomodoros?: Pomodoro[] = [];

	constructor({
		name,
		description,
		number_of_intervals,
		break_size,
		break_long_nth,
		break_long_size
	}: ProjectConfig) {
		this.id = `${Math.random()}`;

		setIfDefiend<Project>(this, {
			name,
			description,
			number_of_intervals,
			break_size,
			break_long_nth,
			break_long_size
		})
	}

	addPomodoro(pomodoro: Pomodoro) {
		this.pomodoros.push(pomodoro);
	}

	static of(config: ProjectConfig): Project {
		const project = new Project(config);

		if (config.pomodoros) {
			config.pomodoros.forEach(item => project.addPomodoro(Pomodoro.of(item)));
		}

		return project;
	}
}
