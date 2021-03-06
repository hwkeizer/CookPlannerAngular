import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Planning } from 'src/app/model/Planning';
import { PlanningService } from 'src/app/service/planning/planning.service';



@Component({
  selector: 'app-planning-overview',
  templateUrl: './planning-overview.component.html',
  styleUrls: ['./planning-overview.component.css']
})
export class PlanningOverviewComponent implements OnInit {

  planningForm: FormGroup;
  planBoard: Planning[];

  constructor(
    private formBuilder: FormBuilder,
    private planningService: PlanningService) {}

  ngOnInit() {
    this.planningService.getPlanningList().subscribe(
      data => {
        this.planBoard = data.result;
        this.planningForm = this.formBuilder.group({
          planBoard: new FormArray([])
        });
        this.planningToPlanBoard();
      }
    )    
  }
  
  /**
   * Add the current planBoard to the FormArray
   */
  planningToPlanBoard() {
    if (this.planBoard) {
      this.planBoard.map((o, i) => {
        const formGroup = this.formBuilder.group({
          // id: [planning.id || ''],
          // date: [planning.date || ''],
          // name: [planning.name || ''],
          // servings: [planning.servings || ''],
          onShoppingList: [o.onShoppingList || '']
        });
        (this.planningForm.controls.planBoard as FormArray).push(formGroup);
      });
    }    
  }

  addEmptyPlanning() {
    this.planningService.addEmptyPlanning().subscribe(
      data => {
        this.planBoard = this.planBoard.slice(0); // Force @Input planBoard change
        this.planBoard = data.result;        
        this.planningToPlanBoard();
      }
    )
  }

  addPlanning(recipe) {
    this.planningService.addPlanning(recipe).subscribe(
      data => {
        this.planBoard = this.planBoard.slice(0); // Force @Input planBoard change
        this.planBoard = data.result;
        this.planningToPlanBoard();
      }
    )
  }

  removePlanning(planning: Planning) {
    this.planningService.removePlanning(planning).subscribe(
      data => {
        this.planBoard = this.planBoard.slice(0); // Force @Input planBoard change
        this.planBoard = data.result;        
        this.planningToPlanBoard();
      }
    )
  }

  // Move the planning one up on the planboard
  moveUp(planning: Planning) {
    var index = this.planBoard.indexOf(planning);
    if (index === 0) return; // Already the first element
    // Switch the dates
    let oldDate: Date = this.planBoard[index].date;
    this.planBoard[index].date = this.planBoard[index-1].date;
    this.planBoard[index-1].date = oldDate;
    this.planBoard.splice(index - 1, 0, this.planBoard.splice(index, 1)[0]);
    this.planningToPlanBoard();
    this.planningService.updatePlanning(this.planBoard).subscribe(data => {});
  }

  // Move the planning one down on the planboard
  moveDown(planning: Planning) {
    var index = this.planBoard.indexOf(planning);
    if (index === this.planBoard.length - 1) return; // Already the last element
    let oldDate: Date = this.planBoard[index].date;
    this.planBoard[index].date = this.planBoard[index+1].date;
    this.planBoard[index+1].date = oldDate;
    this.planBoard.splice(index + 1, 0, this.planBoard.splice(index, 1)[0]);
    this.planningToPlanBoard();
    this.planningService.updatePlanning(this.planBoard).subscribe(data => {});
  }

  setLastServedDate(planning: Planning) {
    alert("Sorry, nog niet geimplementeerd")
  }

  toggleOnShoppingList(planning: Planning) {    
    var index = this.planBoard.indexOf(planning);
    if (index !== -1) {
      this.planBoard = this.planBoard.slice(0); // Force @Input planBoard change
      this.planBoard[index].onShoppingList = !this.planBoard[index].onShoppingList;
    }
    console.log("PLANBOARD: ", this.planBoard)
  }

  // Accepts a Date object or date string that is recognized by the Date.parse() method
  getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'][dayOfWeek];
  }

  // get servings() {return this.planningForm.get('planning.servings');}
  // get onShoppingList() {return this.planningForm.get('planning.onShoppingList');}

}
