import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ExitComponent } from '../../shared/exit.guard';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, ExitComponent {

  id: string;
  showDetails: string;
  showWarning = false;
  sender: Observer<boolean>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    this.sender.next(decision);
    this.sender.complete();
  }

  canExit(): Observable<boolean> {
    return new Observable<boolean>(sender => {
      this.showWarning = true;
      this.sender = sender;
    });
  }
}
