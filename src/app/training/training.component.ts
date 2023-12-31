import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  
  ongoingTraining = false;
  exerciseSubscription: Subscription = new Subscription();

  constructor(private trainingService: TrainingService){}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged
                                    .subscribe(exercise=>{
                                        if (exercise.id!='none')
                                          this.ongoingTraining = true;
                                        else
                                          this.ongoingTraining = false;
                                     });
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
