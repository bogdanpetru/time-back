export interface StrawberryConfig {
  startTime?: number;
  endTime?: number;
  notes?: string;
  name?: string;
}

export interface Strawberry extends StrawberryConfig {
	id: string;
}

export interface ProjectDescription {
	name: string;
	description?: string;
	numberOfStrawberries?: number;
	strawberrySize: number;
	breakSize?: number;
	breakLongSize?: number;
	breakLongNth?: number;
	strawberries?: Strawberry[],
}

export interface Project extends ProjectDescription {
  id: string;
}