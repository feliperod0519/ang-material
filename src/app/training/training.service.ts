import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise= { id:'none' } as Exercise;
  exerciseChanged = new Subject<Exercise>();
  private exercisesHistory: Exercise[] = [];

  get exercises(){
    return this.availableExercises.slice();
  }

  constructor() { }

  startExercise(selectedId:string){
    this.runningExercise = this.availableExercises.find(ex=>ex.id===selectedId) as Exercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.exercisesHistory.push({...this.runningExercise, 
                                date: new Date(), 
                                state:'completed'});
    this.runningExercise = { id:'none' } as Exercise;
    this.exerciseChanged.next(this.runningExercise);
  }

  cancelExercise(progress: number){
    this.exercisesHistory.push({...this.runningExercise,
      duration:this.runningExercise.duration * (progress/100),
      calories:this.runningExercise.calories * (progress/100), 
      date: new Date(), 
      state:'cancelled'});
    this.runningExercise = { id:'none' } as Exercise;
    this.exerciseChanged.next(this.runningExercise);
  }

  getRunningExercise(){
    return {...this.runningExercise};
  }

  getCompletedOrCancelledExercises(): Exercise[]{
    return this.exercisesHistory.slice();
  }

}
